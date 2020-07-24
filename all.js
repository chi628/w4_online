import pagination from './pagination.js';
import modal from './modal.js';
Vue.component('pagination', pagination);
Vue.component('modal', modal);
new Vue({
    el: '#app',
    data() {
        return {
            products: [],
            pagination: {},
            tempProduct: {
                imageUrl: []
            },
            api: {
                uuid: '8e167757-8b00-4955-b28e-9494996b792d',
                apiPath: 'https://course-ec-api.hexschool.io/api/',
            },
            token: '',
            isNew: '',
        }
    },
    methods: {
        updateProduct() {},
        openModal(isNew, item) {
            switch (isNew) {
              case 'new':
                this.tempProduct = { imageUrl: [] };
                $('#productModal').modal('show');
                break;
              case 'edit':
                // this.loadingBtn = item.id;
                axios.get(`${this.api.apiPath}${this.api.uuid}/admin/ec/product/${item.id}`).then((res) => {
                  this.tempProduct = res.data.data;
                  $('#productModal').modal('show');
                //   this.loadingBtn = ''; //清除
                });
                break;
              case 'delete':
                $('#delProductModal').modal('show');
                this.tempProduct = Object.assign({}, item);
                break;
              default:
                break;
            }
          },
          delProduct() {
            if (this.tempProduct.id) {
              const id = this.tempProduct.id;
              this.products.forEach((item, i) => {
                if (item.id === id) {
                  this.products.splice(i, 1);
                  this.tempProduct = {};
                }
              });
            }
            $('#delProductModal').modal('hide');
          },
        getProducts(num=1) { //將num預設值設為1
            console.log("getproducts"+num);
            axios.get(`${this.api.apiPath}${this.api.uuid}/admin/ec/products?page=${num}`).then(res => {
                console.log(res);
                this.products = res.data.data;
                this.pagination = res.data.meta.pagination;

                //close modal
                if(this.tempProduct.id){
                    this.tempProduct = {
                        imageUrl: [],
                    };
                    $('#productModal').modal('hide');
                }
            })
        }
    },
    created() {
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)MikoToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log(this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.getProducts();
    },
})