<template>
  <div>
    <warning>Image submission is not secure and is only for demo purposes.</warning>

    <canvas id="c" style="border:1px solid #CA0000;"></canvas>

    <b-field position="is-centered" class="file">
      <b-upload required accept="image/*" v-model="filename">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <span>Click to upload</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="filename">{{ displayFileName }}</span>
      <a class="button is-primary" v-on:click="clearArtboard">
        <span>Clear</span>
      </a>
      <a class="button is-primary" v-on:click="saveImage">
        <span>Analyse</span>
      </a>
    </b-field>

    <!-- <button @click="isModalActive=true" class="button is-primary">Back to label</button> -->
    <!-- <b-modal :active.sync="isModalActive" has-modal-card>
      <scar-label-modal>
        <img class="scar-label" src="@/assets/test.jpg" alt>
      </scar-label-modal>
    </b-modal>-->
    <br>
  </div>
</template>


<script>
import { fabric } from "fabric";
import Warning from "@/components/misc/Warning";
export default {
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  components: {
    Warning
  },
  data() {
    return {
      filename: null,
      displayFileName: null,
      form: {
        image: ""
      }
    };

  },


  mounted: function() {
    var canvas = (this.__canvas = new fabric.Canvas("c", {
      isDrawingMode: true
    }));

    canvas.selection = true;
    canvas.setHeight(500);
    canvas.setWidth(500);

    canvas.freeDrawingBrush = new fabric["PencilBrush"](canvas);
    canvas.freeDrawingBrush.color = "Black";
    canvas.freeDrawingBrush.width = 10;
  },

  methods: {
    clearArtboard() {
      var canvas = this.__canvas;
      canvas.clear();
      this.filename = null
    },

    async saveImage() {
      var canvas = this.__canvas;

      /*var img = new Image();
      img.id = "pic";
      img.crossOrigin = 'Anonymous';
      img.src = canvas.toDataURL();*/

      const data = new FormData();
      data.append("file", canvas.toDataURL("image/jpg"));
      data.append("upload_preset", "woundscars");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/nikolamus/image/upload",
        {
          method: "POST",
          body: data
        }
      );
      const uploadedFileUpdate = await res.json();

      this.$snackbar.open({
        message: `Image analysed sucessfullly`,
        position: "is-top"
      });

      /*
      data.append("file", img);
      data.append("upload_preset", "woundscars");
      const recog = await fetch(
        "https://api.cloudinary.com/v1_1/nikolamus/image/upload",
          {
            method: "POST",
            body: data
          }
      );

      const uploadedFileUpdate = await recog.json();*/

      // update form
      this.form.image = uploadedFileUpdate.secure_url;
      Object.assign(this.wizardData, this.form);
    }
  },

  watch: {
    async filename(file) {
      if (this.filename == null) {
        }
      else {
        this.$Progress.start();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "woundscars");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/nikolamus/image/upload",
          {
            method: "POST",
            body: data
          }
        );
        const uploadedFile = await res.json();
        // user feedback
        this.$Progress.finish();
        this.$snackbar.open({
          message: `Image uploaded sucessfullly`,
          position: "is-top"
        });
        this.displayFileName = file.name;

        var canvas = this.__canvas;

        canvas.setHeight(uploadedFile.height);
        canvas.setWidth(uploadedFile.width);

        fabric.Image.fromURL(
          uploadedFile.secure_url,
          function(myImg) {
            var img1 = myImg.set({
              left: 0,
              top: 0,
              width: uploadedFile.width,
              height: uploadedFile.height
            });
            canvas.add(img1);
          },
          { crossOrigin: "anonymous" }
        );
      }
    }
  }
};
</script>

<style scoped>
.button {
  margin: auto !important;
}
</style>


