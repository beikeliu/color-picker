import { defineComponent, ref } from 'vue'
import './SliderBar.scss'
import { useThumb } from './script'
export const SliderBar = defineComponent({
  name: 'SliderBar',
  setup() {
    const track = ref<HTMLDivElement | null>(null)
    const thumb = ref<HTMLDivElement | null>(null)
    const { thumbStyle, handleMouseDown } = useThumb(thumb, track)
    return { thumb, track, thumbStyle, handleMouseDown }
  },
  render() {
    return (
      <div>
        <div class="slider-bar__track" ref="track">
          <div
            class="slider-bar__track__thumb"
            ref="thumb"
            style={this.thumbStyle}
            onMousedown={this.handleMouseDown}
          ></div>
        </div>
      </div>
    )
  }
})
