import Vue from 'vue';
import VueRouter from 'vue-router';

import Topbar from 'renderer/components/Topbar';

describe('Topbar.vue', () => {
    it('should render', () => {
        Vue.use(VueRouter);
        const router = new VueRouter({
            routes: []
        });

        const vm = new Vue({
            router,
            el: document.createElement('div'),
            render: h => h(Topbar)
        }).$mount();

        expect(vm.$el !== null).to.be.true;
        expect(vm.$el.querySelector('.logo') !== null).to.be.true;
    });
});
