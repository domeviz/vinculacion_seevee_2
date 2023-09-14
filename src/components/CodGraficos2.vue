<template>
    
  <v-row justify="space-around">
      <!--Etiqueta Titulo Mapas-->
      <div style="margin-top: 20px;">
          <v-row class=" justify-center titulo_label">
              <v-card elevation="25">
              <v-card-text class="map_titulo">
                  <div class="d-flex justify-center white--text"> GRÁFICOS DE RESULTADOS</div>
              </v-card-text>
              </v-card> 
          </v-row>
          
      </div>
      <div class="color" style="overflow-x: auto; width: 100%; position: absolute;">
          <div style="margin-left: 100px;">
              <div
              v-for="(data, index) in chartData"
              :key="index"
              style="margin-top: 180px; white-space: nowrap; "
              >
              <div>
                  <div
                  v-for="(value, dataIndex) in data.values"
                  :key="dataIndex"
                  style="display: inline-block; margin-right: 20px; position: relative;"
                  >
                  <div
                      :style="`background-color: ${value.color}; height: ${value.height * 5}px; width: 60px; margin-left: 110px; box-shadow: 8px 2px 8px rgba(0, 0, 0, 0.5);`"
                  ></div>
                  <img
                      :src="value.bar_image"
                      style="width: 70px; height: 70px; margin-right: 5px; position: absolute; top: -80px; left: 0; margin-left: 105px;"
                  />
                  <div style="display: flex; align-items: center; margin-right: 60px; margin-top: 10px;">
                      <img
                      :src="value.image"
                      style="width: 80px; height: 80px; margin-right: 10px;"
                      />
                      <div style="display: flex; flex-direction: column; justify-content: center;">
                      <div style="text-align: center; font-size: 20px;">
                          <span v-html="formatName(value.name)"></span>
                      </div>
                      <div
                          style="margin-left: 15px; text-align: center;"
                          :style="{ color: value.color }"
                      >
                          <span style="font-weight: bold; font-size: 25px;">{{ value.height }} %</span>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>
          </div>
      </div>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      chartData: [
        {
          label: 'Dato 1',
          values: [
            {
              color: '#045A8D',
              height: 52.36,
              image: require('@/assets/Candidatos/1.png'),
              bar_image: require('@/assets/Partidos/1.png'),
              name: 'Guillermo<br>Lasso',
            },
            {
              color: '#EF8A62',
              height: 47.64,
              image: require('@/assets/Candidatos/2.png'),
              bar_image: require('@/assets/Partidos/2.png'),
              name: 'Andrés<br>Arauz',
            },
          ],
        },
      ],
    };
  },
  methods: {
    formatName(name) {
      return name.replace(/<br>/g, '<br/>');
    },
  },
};
</script>

<style scoped>
.color{
  display: flex;
  align-items: center;
  margin-top: 40px;
  padding: 10px;

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
