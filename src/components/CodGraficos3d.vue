<template>
  <v-row justify="space-around">

    <!--Etiqueta Titulo Mapas-->
    <div class="desplazamiento">
      <v-row class=" justify-center titulo_label">
        <v-card elevation="25">
          <v-card-text class="map_titulo">
            <div class="d-flex justify-center white--text"> GRÁFICOS DE RESULTADOS</div>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
    <v-card class="load" outlined color="transparent" width="100%">
      <div class="chartdiv" ref="graf">
      </div>
    </v-card>
  </v-row>
</template>

<script >
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: 'HelloWorld',
  mounted() {
    // Create chart instance
    var chart = am4core.create(this.$refs.graf, am4charts.XYChart3D);

    // Add data
    chart.dataSource.url = "porcentajeGrafico/porcent1v.json";
    chart.data = chart.dataSource.url;
    chart.dataSource.load();
    // Create axes
    //chart.xAxes.push(new am4charts.categoryAxis());
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.maxZoomFactor = 5;

    categoryAxis.dataFields.category = "Candidato";
    categoryAxis.title.text = "Candidatos";


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Porcentajes";

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "Candidato";
    series.name = "Partido";
    series.tooltipText = "{Partido}: [bold]{valueY}%[/]";
    series.columns.template.width = am4core.percent(80);



    function getColorByIndex(index) {
      var arrayColors = ['#045A8D', '#EF8A62', '#54278f', '#fcbd00', '#41b6c4', '#d81b60', '#cb4335', '#808080', '#239b56', '#553d2a', '#d4ac0d', '#006691', '#fa8072', '#765900', '#00ffff', '#cb35a3'];

      // Asegurarse de que el índice esté dentro del rango de la matriz de colores
      index = index % arrayColors.length;

      return arrayColors[index];
    }
    series.columns.template.adapter.add("fill", (fill, target) => {
      //console.log("color" + chart.colors.getIndex(target.dataItem.index))
      return getColorByIndex(target.dataItem.index);
    });

    // Establece el número de barras por defecto 
    var defaultBarCount = 5; // Número de barras por defecto 
    series.defaultState.properties.visibleRange = { start: 0, end: defaultBarCount - 1 };
    // Habilita el scroll horizontal chart.scrollbarX = new am4core.Scrollbar(); chart.scrollbarX.marginBottom = 20;
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.marginBottom = 20;
    chart.scrollbarX.thumb.minWidth = 280;
    chart.scrollbarX.thumb.maxWidth = 50;

    chart.scrollbarX.background.fill = am4core.color("#fdffff");
    chart.scrollbarX.background.fillOpacity = 0.3;
    chart.scrollbarX.thumb.background.fill = am4core.color("#12A2C2");
    chart.scrollbarX.thumb.background.fillOpacity = 0.5;
    console.log("scroll" + chart.scrollbarX);
    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Menu para exportar los mapas en imágenes y png 
    chart.exporting.menu = new am4core.ExportMenu();
    // Posición del botón
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
    chart.exporting.menu.items[0].icon = "download.svg"

    chart.exporting.filePrefix = "Porcentaje Candidatos";
    chart.exporting.adapter.add("data", function (data) {
      data.data = [];
      for (var i = 0; i < chart.data.length; i++) {
        var row = chart.data[i];
        data.data.push({
                        "Candidato": row.Candidato,
                        "Partido Político": row.Partido,
                        "Porcentaje total": row.value
                    });
    }
      return data;
    });

  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}

</script>

<style scoped>
.desplazamiento {
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: flex;
}

.load {
  margin-top: 60px;
  padding: 10px;
  width: 100%;
  height: 630px;

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}


.chartdiv {
  background-color: rgb(238, 242, 242);
  width: 90%;
  height: 90%;

}
</style>