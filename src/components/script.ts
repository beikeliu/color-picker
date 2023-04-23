import { computed, onMounted, reactive, ref, type Ref } from 'vue'
import { clamp } from './util'
/**
 * 绘制背景板
 * createLinearGradient 创建线性渐变色 x起点 y起点 x终点 y终点
 * addColorStop 添加一个由偏移值和颜色值指定的断点到渐变
 * hsla 色轮度(hue) 饱和度(saturation) 亮度(lightness) 透明度(alpha)
 * @param canvas
 * @param ctx
 */
export function drawPlate(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const gradient_tr = ctx.createLinearGradient(0, 0, canvas.width, 0)
  gradient_tr.addColorStop(0, 'hsla(0, 0%, 100%, 1)')
  gradient_tr.addColorStop(1, 'hsla(0, 100%, 50%, 1)')
  ctx.fillStyle = gradient_tr
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const gradient_bl = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient_bl.addColorStop(0, 'hsla(0, 0%, 100%, 0)')
  gradient_bl.addColorStop(1, 'hsla(0, 0%, 0%, 1)')
  ctx.fillStyle = gradient_bl
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

/**
 * circle相关方法
 * @param canvas
 * @returns
 */
export function useCircle(canvas: Ref<HTMLCanvasElement | null>) {
  const circleX = ref(-100)
  const circleY = ref(-100)
  const position = reactive({ x: 0, y: 0 })
  const circleStyle = computed(() => {
    return {
      transform: `translate(${circleX.value}px,${circleY.value}px)`
    }
  })
  const handleMouseDown = (e: MouseEvent) => {
    circleX.value = e.clientX - 4
    circleY.value = e.clientY - 4
    window.addEventListener('mousemove', handleMouseMove)
  }
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', handleMouseMove)
  })
  function handleMouseMove(e: MouseEvent) {
    const { top, left, height, width } = canvas.value!.getBoundingClientRect()    
    circleX.value = clamp(e.clientX - 4, left, left + width - 8)
    circleY.value = clamp(e.clientY - 4, top, top + height - 8)
    position.x = circleX.value - left
    position.y = circleY.value - top
  }
  return { circleStyle, handleMouseDown, position }
}

/**
 * thumb相关方法
 * @param thumb
 * @param track
 * @returns
 */
export function useThumb(thumb: Ref<HTMLDivElement | null>, track: Ref<HTMLDivElement | null>) {
  const x = ref(0)
  const thumbStyle = computed(() => {
    return {
      transform: `translate(${x.value}px, -3.25px)`
    }
  })
  let rect = { left: 0, width: 0 }
  onMounted(() => {
    rect = track.value!.getBoundingClientRect()
  })
  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove)
  }
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', handleMouseMove)
  })
  function handleMouseMove(e: MouseEvent) {
    const { left, width } = rect
    x.value = clamp(e.clientX - left, 0, width - 15)
  }
  return { thumbStyle, handleMouseDown }
}

type Position = { x: number; y: number }
export function updateColor(position: Position, canvas: Ref<HTMLCanvasElement | null>, h = 0, a = 1) {
  const { x, y } = position
  const { width: wd, height: hg } = canvas.value!
  const s = x / wd
  const v = 1 - y  / hg
  return { h, s, v, a }
}
