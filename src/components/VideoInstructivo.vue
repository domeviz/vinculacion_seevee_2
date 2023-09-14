<template>
     <div class="align-center" centered >
        <section>
            <iframe class="color"  src="https://www.youtube.com/embed/S_bhJ4hKKik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        </section>
     </div>
</template>

<script>
    export default {
      name: 'VideoInstructivo',
      props: {
        
      },
      data(){
          return{
             team: [
                {
                    name:'xyz', role: 'SGGSIE&T,Nande',avatar:''
                },
             ]
          }
        
      }
    }
    </script>
    <style scoped>
    .color {
        width: 60%;
        height: 375px;
}
    </style>