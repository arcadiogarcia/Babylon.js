module BABYLON {
    /**
     * Class used to generate noise procedural textures
     */
    export class NoiseProceduralTexture extends ProceduralTexture {
        private _time = new Vector2();

        /** Gets or sets a value between 0 and 1 indicating the overall brightness of the texture (default is 0.2) */
        public brightness = 0.2;

        /** Defines the first octave to start from (default is 3) */
        public firstOctave = 3;

        /** Defines the number of octaves to process */
        public octaves = 8;

        /** Defines the level of persistence (0.8 by default) */
        public persistence = 0.8;

        /** Gets or sets animation speed factor for X axis (default is 1) */
        public animationSpeedFactorX = 1;

        /** Gets or sets animation speed factor for Y axis (default is 1) */
        public animationSpeedFactorY = 1;

        /**
         * Creates a new NoiseProceduralTexture
         * @param name defines the name fo the texture
         * @param size defines the size of the texture (default is 256)
         * @param scene defines the hosting scene
         * @param fallbackTexture defines the texture to use if the NoiseProceduralTexture can't be created
         * @param generateMipMaps defines if mipmaps must be generated (true by default)
         */
        constructor(name: string, size: number = 256, scene: Nullable<Scene> = Engine.LastCreatedScene, fallbackTexture?: Texture, generateMipMaps?: boolean) {
            super(name, size, "noise", scene, fallbackTexture, generateMipMaps);
            this._updateShaderUniforms();
        }

        private _updateShaderUniforms() {
            let scene = this.getScene();

            if (!scene) {
                return;
            }

            this._time.x += scene.getAnimationRatio() * this.animationSpeedFactorX * 0.001;
            this._time.y += scene.getAnimationRatio() * this.animationSpeedFactorY * 0.001;

            this.setFloat("brightness", this.brightness);
            this.setInt("firstOctave", this.firstOctave);
            this.setInt("octaves", this.octaves);
            this.setFloat("persistence", this.persistence);
            this.setVector2("timeScale", this._time);
        }

        /** Generate the current state of the procedural texture */
        public render(useCameraPostProcess?: boolean) {
            this._updateShaderUniforms();
            super.render(useCameraPostProcess);
        }

        /**
         * Serializes this noise procedural texture
         * @returns a serialized noise procedural texture object
         */
        public serialize(): any {
            var serializationObject = SerializationHelper.Serialize(this, super.serialize());
            serializationObject.customType = "BABYLON.NoiseProceduralTexture";

            return serializationObject;
        }

        /**
         * Creates a NoiseProceduralTexture from parsed noise procedural texture data
         * @param parsedTexture defines parsed texture data
         * @param scene defines the current scene
         * @param rootUrl defines the root URL containing noise procedural texture information
         * @returns a parsed NoiseProceduralTexture
         */
        public static Parse(parsedTexture: any, scene: Scene, rootUrl: string): NoiseProceduralTexture {
            var texture = SerializationHelper.Parse(() => new NoiseProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);

            return texture;
        }        
    }
}