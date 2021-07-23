<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="import-client" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header">
            <div class="d-flex justify-content-between mb-3" style="width:100%">
              <h3 class="modal-title">Client import</h3>
              <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
              </button>
            </div>
            <p class="cashback-sub-title instruction" style="font-weight:normal ">Import instructions</p>
            <div class="download">
                <img class="mr-1" src="../../assets/icons/download.svg">
                <a href="../../assets/standartmodal.html" download>download example</a>
            </div>
          </div>

          <div class="modal-body category-body">

            <form action="/file-upload" ref="dropzone"
                  class="dropzone dropzone-form text-center"
                  id="myAwesomeDropzone" >
              <img class="uplimg" src="../../assets/icons/uploadExcel.svg">
              <input class="drop-input" name="file" type="file"/>
              <div class="errorExport">
                <img src="../../assets/icons/exportError.svg"><br>
                <span style="color:#D81919">Error</span>
              </div>
            </form>


            <div class="d-flex justify-content-end">
              <button  class="save">Import</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone'
export default {
  name: "ImportClient",

  methods:{

    importClient(){
      Dropzone.options.myAwesomeDropzone = {
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 1000, // MB
        addRemoveLinks:true,
         maxFiles:1,
         init: function() {
          this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
          });
        }
      };


    }
  },
  mounted(){
    this.importClient()

  }
}
</script>

<style scoped>
.category-content{
  border:0;
  background: #FFFFFF;
  border-radius: 5px !important;
  width: 30rem;
  height: 400px;
}

.category-body{
  padding: 0 50px;
  padding-bottom: 34px;
}
.modal-content .modal-header{
  padding: 27px 30px;
  display: block;
}
.category-body{
  padding: 0 30px;
  padding-bottom: 30px;
}

.instruction{
  margin-bottom: 5px;
}
.download a,.download a:hover{
  color:#616CF5;
  text-decoration: none;
}
.dropzone-form{
  margin-bottom: 24px;
  min-height:inherit;
  border: 1px dashed #8C94A5;
  border-radius: 5px;
  height: 165px;
  position: relative;
  padding: 0;
}
.drop-input{
  display: none;
}
.dropzone img{
  margin-bottom: 5px;
  margin-top: 35px;
}
.errorExport{
  display: none;
}
.showfile{
  min-height: 20px !important;
}

</style>