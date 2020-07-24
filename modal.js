export default{
    template:` <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 id="exampleModalLabel" class="modal-title">
                <span >新增產品</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label for="imageUrl">輸入圖片網址</label>
                        <input type="text" id="imageUrl" v-model="tempProduct.imageUrl" class="form-control" placeholder="請輸入圖片連結">
                    </div>
                    <img class="img-fluid" :src="tempProduct.imageUrl">
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="tilte">商品名稱</label>
                        <input type="text" id="tilte" class="form-control" v-model="tempProduct.title" placeholder="請輸入商品名稱">
                    </div>
                    <div class="form-row">
                         <div class="form-group col-md-6">
                             <label for="category">類別</label>
                             <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                             placeholder="請輸入產品類別" >
                         </div>
                        <div class="form-group col-md-6">
                            <label for="unit">單位</label>
                            <input type="text" id="unit" class="form-control" v-model="tempProduct.unit" placeholder="請輸入商品單位">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="origin_price">原價</label>
                            <input type="number" id="origin_price" class="form-control" v-model="tempProduct.origin_price" placeholder="請輸入原價">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">特價</label>
                            <input type="number" id="price" class="form-control" v-model="tempProduct.price" placeholder="請輸入特價價格">
                        </div>
                    </div>
                    <hr>
                    <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" id="description" class="form-control" v-model="tempProduct.description" placeholder="請輸入商品描述"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="content">產品說明</label>
                        <textarea type="text" id="content"  class="form-control" v-model="tempProduct.content" placeholder="請輸入產品說明或注意事項"></textarea>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input type="checkbox" id="is_enabled" class="form-check-input" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button class="btn btn-danger" type="button" @click="updateProduct">Done</button>
        </div>
    </div>
</div>`,
  data() {
      return {
        // tempProduct:{}
      }
  },
  props:['tempProduct','api'],//從外層api近來給methods裡的url使用
  methods: {
    updateProduct(){
        axios.patch(`${this.api.apiPath}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`, this.tempProduct)
        .then(res=> {
          console.log(res);
          this.$emit('editupdate')
        })
    }
  },
}