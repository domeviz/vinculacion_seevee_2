<template>
  <div class="container">
    <!--Etiqueta Titulo Mapas-->
    <v-row class=" justify-center titulo">
      <div class="align">
        <v-card elevation="25">
          <v-card-text class="map_titulo">
            <div class="d-flex justify-center white--text"> {{ titulo }}</div>
          </v-card-text>
        </v-card>
      </div>
    </v-row>

    <!--Boton para Descarga de Base de Datos segun la vuelta seleccionada-->
    <v-row class="justify-center">
      <div class="content-descarga">
        <v-card>
          <!--Sentencia segun la vuelta-->
          <div lass=" justify-center" v-if="vuelta == 1" >
            <v-fab-transition>
              <v-btn active-class="deep-purple" class="boton-descarga" @click="descargarZIP" color="#12A2C2" dark absolute stacked>
                <div>{{ vuelta }}. DATOS COMPLETOS PRIMERA VUELTA ELECCIONES 2021</div>
                <v-icon size="x-large">download</v-icon>
              </v-btn>
            </v-fab-transition>
          </div>
          <div class="justify-center" v-else>
            <v-fab-transition>
              <v-btn active-class="deep-purple " class="boton-descarga" @click="descargarZIP" color="#12A2C2" dark absolute stacked>
                <div>{{ vuelta }}. DATOS COMPLETOS Segunda VUELTA ELECCIONES 2021</div>
                <v-icon class="icon">download</v-icon>
              </v-btn>
            </v-fab-transition>
          </div>
        </v-card>
      </div>
    </v-row>

    <v-row class="justify-center">
      <table class="content-table">
        <thead>
          <tr>
            <th>
              <h3>Provincia</h3>
            </th>
            <th>
              <h3>Candidato</h3>
            </th>
            <th>
              <h3>Partido Politico</h3>
            </th>
            <th>
              <h3>Porcentaje</h3>
            </th>
            <th>
              <h3>Porcentaje Masculino</h3>
            </th>
            <th>
              <h3>Porcentaje Femenino</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dato in paginaAct" :key="dato">
            <td>{{ dato.prov_tabla }}</td>
            <td>{{ dato.candidato_tabla }}</td>
            <td>{{ dato.partido_pol }}</td>
            <td>{{ dato.porcentaje }}</td>
            <td>{{ dato.porc_mas }}</td>
            <td>{{ dato.porc_fem }}</td>
          </tr>
        </tbody>
      </table>
    </v-row>

    <v-row class="justify-center">
      <div class="paginacion">
        <ul class="btns">
          <li id="ini" v-on:click="actualizarPag(1)">1</li>
          <li id="ant" v-on:click="actualizarPag(pag.act - 1)"><span class="arrow l"></span></li>
          <li>{{ pag.act }}</li>
          <li id="sig" v-on:click="actualizarPag(pag.act + 1)"><span class="arrow r"></span></li>
          <li id="fin" v-on:click="actualizarPag(pag.fin)">{{ pag.fin }}</li>
        </ul>
      </div>
    </v-row>

    <p class="text">Fuente: CNE</p>

  </div>
</template>

<script>

export default ({
  props: {
    vuelta: Number,
    zona: String,
  },
  watch: {
    vuelta: { immediate: true, handler(nuevovalor) { this.actualizarTabla(nuevovalor, this.zona) } }
  },

  data() {
    return {
      titulo: 'TABLAS DE RESULTADOS',
      pag: { ant: 0, act: 1, sig: 2, fin: 0, num: 8 }, //Objeto administrador de paginación
      datos: [], // Datos completos obtenidos de la Api
      paginaAct: [] // Datos que se mostraran en la tabla de acuerdo a la paginación
    }
  },
  methods: {
    GetData(vuelta, nac) { //Método que obtiene los datos desde la Api
      const url = `Tabla/${nac}${vuelta}v.json`;
      console.log(url)
      fetch(url)//petición al endpoint
        .then(response => response.json())// parseo a json
        .then(response => this.datos = response) //guarda los datos
        .then(response => {//llamado a métodos de paginación
          this.Paginacion(response, this.pag.act);
          this.obtenerPags(this.datos.length);
        }
        )
        .catch(err => console.log(err))// captura de errores al realizar la peticion get
    },
    Paginacion(data, page) {//Método que administra los datos que se mostrarán de acuerdo a la paginación
      this.paginaAct = [];//borramos los datos anteriores
      for (let i = (page - 1) * this.pag.num; i < page * this.pag.num; i++) {
        //recorre los datos completos de acuerdo a los parametros de paginación
        if (data[i] != undefined) {
          this.paginaAct.push(data[i]); //Guarda los datos nuevos a mostrar
        }
      }
    },
    actualizarPag(pagAct) {//Método que actualiza que datos se muestran actualmente
      if (pagAct != 0 && pagAct != this.pag.fin + 1) {
        //Se actualizan las propiedades del objeto administrador de paginación
        this.pag.act = pagAct;
        this.pag.ant = pagAct - 1;
        this.pag.sig = pagAct + 1;
        this.Paginacion(this.datos, pagAct)//se actualizan los datos a mostrar
      }
    },
    obtenerPags(numObjs) {//Método que genera la cantidad de páginas a mostrar de acuerdo a la paginación
      this.pag.fin = Math.trunc(numObjs / this.pag.num);//Se asigna el numero de páginas
      if (numObjs % this.pag.num != 0) {//en el caso tener datos sobrantes de acuerdo a la paginación  
        this.pag.fin += 1;//asigna una última página con el residuo de datos
      }
    },
    actualizarTabla() {
      this.GetData(this.vuelta, this.zona)
      console.log("actualizado")
    },
    async descargarZIP() {
      // Ruta o URL del archivo ZIP que deseas descargar
      const url = (this.vuelta == 1) ? 'DatosCompletos/2021_Elecciones_PrimeraVuelta.zip' : 'DatosCompletos/2021_Elecciones_SegundaVuelta.zip';
      const txtvuelta = (this.vuelta == 1) ? 'PRIMERA' : 'SEGUNDA';
      console.log("PruebaaDescarga", this.vuelta)
      try {
        const response = await fetch(url);
        if (response.ok) {
          const contenidoZIP = await response.blob();

          // Crear un enlace temporal al archivo ZIP
          const link = document.createElement('a');
          link.href = URL.createObjectURL(contenidoZIP);

          // Asignar el nombre  para el archivo ZIP
          const nombreZIP = ` ${this.vuelta} . DATOS COMPLETOS  ${txtvuelta} VUELTA ELECCIONES 2021.zip`;
          link.setAttribute('download', nombreZIP);

          // Simular un clic en el enlace para iniciar la descarga
          link.click();
        } else {
          console.error('Error al obtener el archivo ZIP:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }


  },
  mounted() {
    this.GetData(this.vuelta, this.zona)
  }
})

</script>

<style scoped>
.container {
  height: 100%;
  overflow: auto;

}

.titulo {
  color: #000000;
  width: 50%;
  margin: 15px auto;
  text-align: center;
  font-size: 0.9em;
}

.content-table {
  margin-top: 60px;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #12a2c233;
  border-collapse: collapse;
  margin: 25px auto;
  font-size: 0.9em;
  width: 100%;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.5);



}

.content-table th {
  font-family: 'Oswald', sans-serif;
  padding: 12px 15px;
  border-bottom: 3px solid #f1787885;
  border-right: 3px solid #12a2c233;
  color: #000000;
  text-align: center;
  font-weight: normal;
}

.content-table td {
  font-family: 'Source Sans Pro', sans-serif;
  padding: 12px 15px;
  border-bottom: 3px solid #f1787885;
  border-right: 3px solid #12a2c233;
  color: #000000;
  text-align: center;
  font-weight: normal;
}

.content-table tr:hover {
  background-color: #12a2c233;
}

.text {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: medium;
  color: black;
}

.content-descarga {
  margin-top: 2%;
  margin-bottom: 3%;
  width: 100%;

}

.boton-descarga {
  font-family: 'Source Sans Pro', sans-serif;
  margin: auto;
  justify-self: center;
  align-items: center;
  word-break: break-all;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  list-style: none;
  padding: 0;
}

/* estilos de paginacion */
.btns li {
  margin-right: 10px;
  width: 25px;
  cursor: pointer;
  height: 25px;
  background-color: #f1787885;
  border: 3px solid #12a2c2;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.btns li:hover {
  background-color: #12a2c233;
  /* position: relative; */
}

.arrow {
  position: relative;
  z-index: 10;
  width: 0;
  height: 0;
  border-right: 14px solid black;
  border-bottom: 7px solid transparent;
  border-top: 7px solid transparent;
}

.arrow.r {
  transform: rotate(180deg);
}
</style>