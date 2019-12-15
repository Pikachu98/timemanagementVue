<template>
  <form @submit.prevent="submit">

    <div class="form-group" :class="{ 'form-group--error': $v.tagType.$error }">
      <label class="form_tag_label" name="tag">Input Your Tag</label>
      <input class="form_input" placeholder="enter a tag here" v-model.trim="tagType"/>
    </div>
    <div class="error" v-if="!$v.tagType.required">Tag is Required</div>

    <div class="form-group" :class="{ 'form-group--error': $v.tagColor.$error }">
      <label class="form_label">Input Your Color</label>
      <input class="form_input" placeholder="enter a color here" v-model.trim="tagColor"/>
    </div>
    <div class="error" v-if="!$v.tagColor.required">Color of Tag is Required</div>

    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ tagBtnTitle }}</button>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Successful!</p>
<!--    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>-->
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Pending...</p>
  </form>

</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: ' TagForm ',
  props: ['tagBtnTitle', 'tag'],

  data () {
    return {
      tagType: this.tag.tagType,
      tagColor: this.tag.tagColor,
      submitStatus: null
    }
  },

  validations: {
    tagType: {
      required
    },
    tagColor: {
      required
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var tag = {
            tagType: this.tagType,
            tagColor: this.tagColor
          }
          this.tag = tag
          console.log('Submitting in TagForm : ' + JSON.stringify(this.tag, null, 5))
          this.$emit('tag-is-created-updated', this.tag)
        }, 500)
      }
    }
  }
}

</script>

<style scoped>

  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }
  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }
  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }
  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }
  .error:focus {
    outline-color: #ffa519;
  }
</style>
