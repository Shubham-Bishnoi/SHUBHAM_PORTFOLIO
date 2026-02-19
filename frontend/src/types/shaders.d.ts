declare module 'https://esm.sh/@paper-design/shaders' {
  export const liquidMetalFragmentShader: string
  export class ShaderMount {
    constructor(
      container: HTMLElement,
      fragmentShader: string,
      uniforms?: Record<string, unknown>,
      vertexShader?: string | undefined,
      pixelRatio?: number
    )
    destroy?: () => void
  }
}

