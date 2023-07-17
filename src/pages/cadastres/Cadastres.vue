<template>
  <div>
    <q-card>
      <q-card-section>
        <q-btn
          label="Adicionar Cadastro"
          color="green"
          @click="abriModalNovo = true"
        ></q-btn>
      </q-card-section>
      <q-card-section>
        <q-table title="Cadastro" :data="data" :columns="columns" row-key="id">
          <template v-slot:body-cell-act="props">
            <q-tr>
              <q-td>
                <q-btn
                  size="sm"
                  icon="edit"
                  flat
                  color="orange"
                  @click="edit(props.row.id)"
                />
              </q-td>
              <q-td>
                <q-btn
                  size="sm"
                  icon="delete"
                  flat
                  color="red"
                  @click="abrirExclusao(props.row.id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-dialog v-model="abriModalNovo" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <Cadastre-Form :Id="id"
         @cadastroSalvoEmit="cadastroSalvoEvent"
        @fecharModalEmit="fecharModalEvent">
        </Cadastre-Form>
      </q-card>
    </q-dialog>

    <!-- Esse modal deve virar componente -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >Tem certeza que deseja excluir o registro!</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Confirmar" color="primary" @click="excluir()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notify } from "quasar";
import config from "./config/cadastres.json";

@Component({
  components: {
    CadastreForm: () => import("./components/CadastreForm.vue"),
  },
})
export class Cadastres extends Vue {
  data: any[] = [];

  abriModalNovo = false;
  confirm = false;

  private columns = config.columns;

  id: number = 0;

  created() {
    this.buscar();
  }

  async buscar() {
    try {
      this.$q.loading.show();

      let { data } = await this.$services.cadastre.getList();
      this.data = data;
    } catch (error) {
      //Transformar em componente static
      this.$q.notify({
        message: "Ocorreu um erro inesperado",
        type: "negative",
      });
    } finally {
      this.$q.loading.hide();
    }
  }

  async cadastroSalvoEvent() {
    this.abriModalNovo = false;
    this.buscar();
  }

  async fecharModalEvent() {
    this.id = 0;
    this.abriModalNovo = false;
  }

  async edit(id) {
    this.id = id;
    this.abriModalNovo = true;
  }

  abrirExclusao(id) {
    this.id = id;
    this.confirm = true;
  }

  async excluir() {
    try {
      this.$q.loading.show();

      let { data } = await this.$services.cadastre.delete(this.id);
      this.confirm = false;
      this.buscar();
    } catch (error) {
      //Transformar em componente static
      this.$q.notify({
        message: "Ocorreu um erro inesperado",
        type: "negative",
      });
    } finally {
      this.$q.loading.hide();
    }
  }
}

export default Cadastres;
</script>
