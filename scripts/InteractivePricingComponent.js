export default class InteractivePricingComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback() {
        this.#internals.shadowRoot.querySelector('span[class="cost"]').style.display = "grid";
        this.#internals.shadowRoot.querySelector('input[id="cost-slider"]').addEventListener('change', () => this.updatePaymentPlan());
        this.#internals.shadowRoot.querySelector('input[id="billing-monthly"]').addEventListener('input', () => this.updatePaymentPlan());
        this.#internals.shadowRoot.querySelector('input[id="billing-yearly"]').addEventListener('input', () => this.updatePaymentPlan());
    }
    updatePaymentPlan = () => {
        const value = this.#internals.shadowRoot.querySelector('input[id="cost-slider"]').value;
        const discount = this.getDiscount();
        this.#internals.shadowRoot.querySelector('input[id="cost-slider"]').setAttribute('value', value);
        switch (value) {
            case "0":
                this.#internals.shadowRoot.querySelector('section[class="pageviews"]').textContent = "10K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${8 * discount}`;
                break;
            case "1":
                this.#internals.shadowRoot.querySelector('section[class="pageviews"]').textContent = "50K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${12 * discount}`;
                break;
            case "2":
                this.#internals.shadowRoot.querySelector('section[class="pageviews"]').textContent = "100K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${16 * discount}`;
                break;
            case "3":
                this.#internals.shadowRoot.querySelector('section[class="pageviews"]').textContent = "500K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${24 * discount}`;
                break;
            case "4":
                this.#internals.shadowRoot.querySelector('section[class="pageviews"]').textContent = "1M PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${36 * discount}`;
                break;

            default:
                break;
        }
    }
    getDiscount() {
        let discount = 1;
        const twentyFivePercentDiscount = 0.75;
        if (this.#internals.shadowRoot.querySelector('input[id="billing-yearly"]').checked == true) {
            discount = twentyFivePercentDiscount;
        }
        return discount;
    }

}
if (!customElements.get('interactive-pricing-component')) {
    customElements.define('interactive-pricing-component', InteractivePricingComponent);
}