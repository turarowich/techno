<template>
  <div :style="{background: color}">
    <ColorPicker
        theme="light"
        :color="color"
        :sucker-hide="true"
        :sucker-canvas="suckerCanvas"
        :sucker-area="suckerArea"
        @changeColor="changeColor"
        @openSucker="openSucker"
    />
  </div>
</template>

<script>
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

export default {
  name:"Picker",
  components: {
    ColorPicker,
  },
  data() {
    return {
      color: '#59c7f9',
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false,
    }
  },
  methods: {
    changeColor(color) {
      this.$emit('sendColor', color.hex)
      const { r, g, b, a } = color.rgba
      this.color = `rgba(${r}, ${g}, ${b}, ${a})`
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },
  },
}
</script>