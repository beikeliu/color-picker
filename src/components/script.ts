import { computed, ref, type Ref } from 'vue'

/**
 * 绘制背景板
 * createLinearGradient 创建线性渐变色 x起点 y起点 x终点 y终点
 * addColorStop 添加一个由偏移值和颜色值指定的断点到渐变
 * hsla 色轮度(hue) 饱和度(saturation) 亮度(lightness) 透明度(alpha)
 * @param canvas
 * @param ctx
 */
export function drawPlate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
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
 * 限制一个值，处于min ~ max值域之间。
 * @param value
 * @param min
 * @param max
 * @returns
 */
export function bound(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

/**
 * circle相关方法
 * @param canvas
 * @returns
 */
export function useCircle(canvas: Ref<HTMLCanvasElement | null>) {
  const circleX = ref(-100)
  const circleY = ref(-100)
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
    circleX.value = bound(e.clientX - 4, left, left + width - 8)
    circleY.value = bound(e.clientY - 4, top, top + height - 8)
  }
  return { circleStyle, handleMouseDown }
}
