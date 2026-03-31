import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface Props {
  url: string
  fileName?: string
  onClose: () => void
}

export function StlViewer({ url, fileName, onClose }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [info, setInfo] = useState<{ x: number; y: number; z: number; vol: number } | null>(null)

  useEffect(() => {
    if (!url || !mountRef.current) return

    const mount = mountRef.current
    const w = mount.clientWidth
    const h = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#F4F5F9')

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 10000)
    camera.position.set(0, 0, 300)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dir1.position.set(1, 2, 3)
    scene.add(dir1)
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.4)
    dir2.position.set(-1, -1, -1)
    scene.add(dir2)

    // Grid
    const grid = new THREE.GridHelper(500, 20, 0xcccccc, 0xdddddd)
    scene.add(grid)

    // Load STL
    const loader = new STLLoader()
    loader.load(
      url,
      (geometry) => {
        geometry.computeBoundingBox()
        geometry.center()

        const bbox = geometry.boundingBox!
        const size = new THREE.Vector3()
        bbox.getSize(size)

        // Рассчитываем объём
        let vol = 0
        const pos = geometry.attributes.position
        for (let i = 0; i < pos.count; i += 3) {
          const v1 = new THREE.Vector3().fromBufferAttribute(pos, i)
          const v2 = new THREE.Vector3().fromBufferAttribute(pos, i + 1)
          const v3 = new THREE.Vector3().fromBufferAttribute(pos, i + 2)
          vol += v1.dot(v2.cross(v3)) / 6
        }
        const volCm3 = Math.abs(vol) / 1000

        setInfo({
          x: Math.round(size.x * 10) / 10,
          y: Math.round(size.y * 10) / 10,
          z: Math.round(size.z * 10) / 10,
          vol: Math.round(volCm3 * 100) / 100,
        })

        const material = new THREE.MeshPhongMaterial({
          color: 0x1400FF,
          specular: 0x444444,
          shininess: 40,
          side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Подстраиваем камеру
        const maxDim = Math.max(size.x, size.y, size.z)
        camera.position.set(maxDim, maxDim * 0.8, maxDim * 1.5)
        controls.target.set(0, 0, 0)
        controls.update()

        setLoading(false)
      },
      undefined,
      (err) => {
        console.error('STL load error:', err)
        setError('Не удалось загрузить файл')
        setLoading(false)
      }
    )

    // Resize
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animate
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [url])

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-none shadow-2xl overflow-hidden">
        {/* Шапка */}
        <div className="bg-[#1400FF] px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-bold tracking-[3px] text-white/50 uppercase">3D-просмотр</div>
            <div className="font-garet font-bold text-white text-sm mt-0.5">
              {fileName || 'Модель'}
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl leading-none">✕</button>
        </div>

        {/* Вьювер */}
        <div className="relative" style={{ height: '420px' }}>
          <div ref={mountRef} className="w-full h-full" />
          {loading && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F4F5F9]">
              <div className="text-sm text-[#999]">Загружаем модель...</div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F4F5F9]">
              <div className="text-sm text-red-500">{error}</div>
            </div>
          )}
        </div>

        {/* Инфо */}
        {info && (
          <div className="px-5 py-4 bg-[#F4F5F9] border-t border-black/[0.06] flex flex-wrap gap-6">
            <div className="text-[10px] text-[#999]">Размеры<br />
              <span className="text-[#080808] font-bold text-xs">{info.x} × {info.y} × {info.z} мм</span>
            </div>
            <div className="text-[10px] text-[#999]">Объём<br />
              <span className="text-[#080808] font-bold text-xs">{info.vol} см³</span>
            </div>
            <div className="text-[10px] text-[#666] self-end ml-auto">
              Управление: вращение — ЛКМ, зум — колесо, перемещение — ПКМ
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
