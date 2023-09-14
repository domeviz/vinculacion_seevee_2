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

    <div class="color" style="overflow-x: auto; width: 100%; position: absolute; left: 0px;">
      <div style="margin-left: 100px; ">
        <div v-for="(data, index) in chartData" :key="index" style="margin-top: 200px; white-space: nowrap; ">
          <div>
            <div v-for="(value, dataIndex) in data.values" :key="dataIndex"
              style="display: inline-block; margin-right: 20px; position: relative;">
              <div
                :style="`background-color: ${value.color}; height: ${value.height * 8}px; width: 60px; margin-left: 110px; box-shadow: 8px 2px 8px rgba(0, 0, 0, 0.5);`">
              </div>
              <img :src="value.bar_image"
                style="width: 70px; height: 70px; margin-right: 5px; position: absolute; top: -80px; left: 0; margin-left: 105px;" />
              <div style="display: flex; align-items: center; margin-right: 60px; margin-top: 10px;">
                <img :src="value.image" style="width: 80px; height: 80px; margin-right: 10px;" />
                <div style="display: flex; flex-direction: column; justify-content: center;">
                  <div style="text-align: center; font-size: 20px;">
                    <span v-html="formatName(value.name)"></span>
                  </div>
                  <div style="margin-left: 15px; text-align: center;" :style="{ color: value.color }">
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
          values: [],
        },
      ],
    };
  },
  methods: {
    formatName(name) {
      return name.replace(/<br>/g, '<br/>');
    },
  },
  mounted() {

    var arrayColors = ['#045A8D', '#EF8A62', '#54278f', '#fcbd00', '#41b6c4', '#d81b60', '#cb4335', '#808080', '#239b56', '#553d2a', '#d4ac0d', '#006691', '#fa8072', '#765900', '#00ffff', '#cb35a3']
    var presidentes = ['Guillermo \n Lasso', 'Andrés \n Arauz', 'Yaku \n Pérez', 'Xavier \n Hervas', 'Pedro \n Freile', 'Isidro \n Romero', 'Lucio \n Gutierrez', 'Gerson \n Almeida', 'Ximena \n Peña', 'Guillermo \n Celi', 'Juan F. \n Velasco', 'Cesar \n Montufar', 'Gustavo \n Larrea', 'Carlos \n Sagnay', 'Giovanny \n Andrade', 'Paul \n Carrasco']
    var porcentaje = [19.74, 32.72, 19.38, 15.68, 2.08, 1.86, 1.78, 1.73, 1.54, 0.91, 0.82, 0.62, 0.4, 0.29, 0.22, 0.21]


    for (var i = 0; i < arrayColors.length; i++) {
      this.chartData[0].values.push({
        color: arrayColors[i],
        height: porcentaje[i],
        image: require(`@/assets/Candidatos/${i + 1}.png`),
        bar_image: require(`@/assets/Partidos/${i + 1}.png`),
        name: this.formatName(presidentes[i]),
      });
    }
  },
};
</script>

<style scoped>
.color{
  align-items: center;
  margin-top: 40px;
  padding: 10px;

}
</style>
