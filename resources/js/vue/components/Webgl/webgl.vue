<template>
    <div id="webgl">
        <!-- div that will hold our WebGL canvas -->
        <div id="canvas"></div>
        <!-- div used to create our plane -->
        <div class="plane">
            <!-- image that will be used as texture by our plane -->
            <img :src="heroWebgl" />
        </div>
    </div>
</template>

<script>
    import {Curtains} from 'curtainsjs';
	//framgent shader needs to be here since it use uTime.
    var fragmentShader = `#ifdef GL_ES
  precision mediump float;
  #endif

  // get our varying variables
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  // the uniform we declared inside our javascript
  uniform float uTime;

  // our texture sampler (this is the lib default name, but it could be changed)
  uniform sampler2D uSampler0;

  void main() {
    // get our texture coords
    vec2 textureCoord = vTextureCoord;

    // displace our pixels along both axis based on our time uniform and texture UVs
    // this will create a kind of water surface effect
    // try to comment a line or change the constants to see how it changes the effect
    // reminder : textures coords are ranging from 0.0 to 1.0 on both axis
    const float PI = 3.141592;

    textureCoord.x += (
      sin(textureCoord.x * 10.0 + ((uTime * (PI / 7.0)) * 0.031))
      + sin(textureCoord.y * 10.0 + ((uTime * (PI / 6.489)) * 0.017))
      ) * 0.00075;

    textureCoord.y += (
      sin(textureCoord.y * 10.0 + ((uTime * (PI / 7.023)) * 0.023))
      + sin(textureCoord.x * 10.0 + ((uTime * (PI / 7.1254)) * 0.037))
      ) * 0.0125;
          
    gl_FragColor = texture2D(uSampler0, textureCoord);
  }`;
    
    var vertexShader = `  #ifdef GL_ES
  precision mediump float;
  #endif

  // those are the mandatory attributes that the lib sets
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  // our texture matrix uniform (this is the lib default name, but it could be changed)
  uniform mat4 uTextureMatrix0;

  // if you want to pass your vertex and texture coords to the fragment shader
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  void main() {
    // get the vertex position from its attribute
    vec3 vertexPosition = aVertexPosition;
    // set its position based on projection and model view matrix
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    // set the varying variables
    // thanks to the texture matrix we will be able to calculate accurate texture coords
    // so that our texture will always fit our plane without being distorted
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vVertexPosition = vertexPosition;
  }`;
    // Plugins
import axios from 'axios';
export default {
    data:function(){
        return{
            heroWebgl : '',
        }
    },
    props : [
        'type'
    ],
    methods:{
        asambleWebgl(){
            // set up our WebGL context and append the canvas to our wrapper
            var webGLCurtain = new Curtains({
                container: "canvas",
                watchScroll:false
            });
            
            // if there's any error during init, we're going to catch it here
            webGLCurtain.onError(function() {
                // we will add a class to the document body to display original images
                document.body.classList.add("no-curtains");
            });

            // get our plane element
            var planeElement = document.getElementsByClassName("plane")[0];
    
            // set our initial parameters (basic uniforms)
            var params = {

                vertexShader: vertexShader, // our vertex shader ID
				fragmentShader: fragmentShader, // our framgent shader ID
                //crossOrigin: "", // codepen specific
                uniforms: {
                    time: {
                        name: "uTime", // uniform name that will be passed to our shaders
                        type: "1f", // this means our uniform is a float
                        value: 1,
                    },
                }
            }

            // create our plane mesh
            var plane = webGLCurtain.addPlane(planeElement, params);
            
    
            // if our plane has been successfully created
            // we use the onRender method of our plane fired at each requestAnimationFrame call
            plane && plane.onRender(function() {
                plane.uniforms.time.value++; // update our time uniform value
            });
        }
    },
    created(){
        var type = this.type;
        axios.get(base_wp_api.root_url + '/wp-json/wp/v2/' + type + '/' + base_wp_api.current_page_ID)
        .then( ( res ) => {
            if(res.data){
                if(type == 'pages'){
                    this.heroWebgl = res.data.acf.hero_webgl_image;
                }else{
                    this.heroWebgl = res.data.post_improvement.image;
                }
            }
        }).finally(()=>{
            this.asambleWebgl();
        });

    }
}
</script>
