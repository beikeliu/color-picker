import { defineComponent, onMounted, ref } from 'vue'
import { drawPlate, useCircle } from './script'
import './ColorPicker.scss'
export const ColorPicker = defineComponent({
  name: 'ColorPicker',
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const { circleStyle, handleMouseDown } = useCircle(canvasRef)
    onMounted(() => {
      drawPlate(canvasRef.value!)
    })
    return { canvasRef, circleStyle, handleMouseDown }
  },
  render() {
    return (
      <article>
        <canvas ref="canvasRef" onMousedown={this.handleMouseDown} />
        <div class="color-picker__circle" style={this.circleStyle}></div>
      </article>
    )
  }
})
