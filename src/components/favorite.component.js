import {Component} from '../core/component'
import { apiService } from '../services/api.service'
import {renderPost} from '../templates/post.template'

export class FavoriteComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))

        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

async function linkClickHandler(event) {
    event.preventDefault()

    if(event.target.classList.contains('js-link')) {
        const postId = event.target.textContent
        this.$el.innerHTML = ''
        this.loader.show()

        const post = await apiService.fetchPostById(postId)

        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withBotton: false}))
        console.log(post)
    }
}

function renderList(list = []) {
    if (list && list.length) {
        return `
            <ul>
                ${list.map(i => `<li><a class="js-link" href="#">${i}</a></li>`).join(' ')}
            </ul>
        `
    }
    
    return '< class="center">Вы пока ничего не добавили</>'
}