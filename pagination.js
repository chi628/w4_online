export default{
    template:`<div class="pagination">
                <a href="#">&laquo;</a>
                <a href="#" v-for="item in pages.total_pages" :key="item" @click.prevent="updatePage(item)" :class="{ active: pages.current_page === item }">{{item}}</a>
                <a href="#">&raquo;</a>
            </div> `,
    props:['pages'],
    methods: {
        updatePage(num){
            // console.log(num);
            this.$emit('update', num);
        }
    },

}