import Vue from 'vue';
import Topbar from 'renderer/components/Topbar';

describe('Topbar.vue', () => {
    it('should render correct contents', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: h => h(Topbar)
        }).$mount();

        expect(vm.$el.querySelector('.logo').textContent).to.contain('Space Snake');
    });
});
