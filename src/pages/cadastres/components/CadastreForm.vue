<template>
  <div>
    <q-card>
      <q-card-section
        ><div class="text-h6">Formulário de Cadastro</div></q-card-section
      >
      <form
        @submit.prevent.stop="salvar"
        @reset.prevent.stop="cancelar"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            filled
            ref="name"
            class="q-pa-md col-xs-12 col-sm-6 col-md-6"
            label="Nome"
            lazy-rules
            v-model="model.name"
            :rules="[(val) => !!val || 'Nome é obrigatório']"
          ></q-input>
          <q-input
            filled
            ref="cpf"
            class="q-pa-md col-xs-12 col-sm-6 col-md-3"
            label="CPF"
            v-model="model.cpf"
            lazy-rules
            mask="###.###.###-##"
            :rules="[(val) => !!val || 'CPF é obrigatório']"
          ></q-input>
          <q-input
            filled
            class="q-pa-md col-xs-12 col-sm-6 col-md-3"
            label="Data de Nascimento"
            v-model="model.born"
            type="date"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" type="reset"></q-btn>
          <q-btn label="Salvar" color="primary" type="submit"></q-btn>
        </q-card-actions>
      </form>
    </q-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import _models from "../models/cadastreModel";
import { required, minLength, email } from "vuelidate/lib/validators";

@Component({})
export class CadastreForm extends Vue {
  @Prop({ type: Number, default: 0 })
  Id!: number;

  model: _models.cadastre = {
    id: null,
    name: null,
    cpf: null,
    born: null,
  };

  created() {
    if (this.Id > 0) this.buscar();
  }

  mounted() {
    if (this.Id == 0) this.limparModel();
  }

  async buscar() {
    try {
      this.$q.loading.show();

      let { data } = await this.$services.cadastre.getById(this.Id);
      this.model = data;
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

  async salvar() {
    try {
      this.$q.loading.show();

      // @ts-ignore: Unreachable code error
      this.$refs.name.validate();
      // @ts-ignore: Unreachable code error
      this.$refs.cpf.validate();

      // @ts-ignore: Unreachable code error
      if (!this.$refs.name.hasError && !this.$refs.cpf.hasError) {
        let { data } = await this.$services.cadastre.save(this.model);

        this.$q.notify({
          message: "Cadastro salvo com sucesso",
          color: "green",
        });
        this.$emit("cadastroSalvoEmit");
      }
    } catch (err) {
      this.$q.notify({
        message: "Erro ao salvar cadastro" + err,
        color: "red",
      });
    } finally {
      this.$q.loading.hide();
    }
  }

  async cancelar() {
    this.Id = 0;
    this.$emit("fecharModalEmit");
  }

  async limparModel() {
    this.model.id = null;
    this.model.name = null;
    this.model.cpf = null;
    this.model.born = null;
  }
}
export default CadastreForm;
</script>
