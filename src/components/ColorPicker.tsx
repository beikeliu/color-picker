import { defineComponent, onMounted, ref, watch } from 'vue'
import { drawPlate, updateColor, useCircle } from './script'
import './ColorPicker.scss'
import { SliderBar } from './SliderBar'
import { HSVAtoRGBA, RGBAtoHex } from './util'
export const ColorPicker = defineComponent({
  name: 'ColorPicker',
  emits: ['change'],
  setup(_, { emit }) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const { circleStyle, handleMouseDown, position } = useCircle(canvasRef)
    onMounted(() => {
      drawPlate(canvasRef.value!)
    })
    watch(position, () => {
      const hsva = updateColor(position, canvasRef)
      const rgba = HSVAtoRGBA(hsva)
      const hex = RGBAtoHex(rgba)
      const color = { hsva, rgba, hex }
      emit('change', color)
    })
    return { canvasRef, circleStyle, handleMouseDown }
  },
  render() {
    return (
      <article class="color-picker">
        <canvas ref="canvasRef" onMousedown={this.handleMouseDown} />
        <div class="color-picker__circle" style={this.circleStyle}></div>
        <SliderBar class="m-top" />
        <SliderBar class="m-top" />
      </article>
    )
  }
})
