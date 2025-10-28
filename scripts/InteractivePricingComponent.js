export default class InteractivePricingComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback() {
        this.#internals.shadowRoot.querySelector('span[class="cost"]').style.display = "grid";
        this.#internals.shadowRoot.querySelector("input[id='cost-slider']").addEventListener("change", () => this.updatePaymentPlan());
        this.#internals.shadowRoot.querySelector("input[id='billing-monthly']").addEventListener("input", () => this.updatePaymentPlan());
        this.#internals.shadowRoot.querySelector("input[id='billing-yearly']").addEventListener('input', () => this.updatePaymentPlan());
    }
    updatePaymentPlan = () => {
        const value = this.#internals.shadowRoot.querySelector('input[id="cost-slider"]').value;
        const yearlyDiscount = 25;
        const discount = this.getDiscount(yearlyDiscount);
        this.#internals.shadowRoot.querySelector("input[id='cost-slider']").setAttribute("value", value);
        switch (value) {
            case "0":
                this.#internals.shadowRoot.querySelector('div[class="pageviews"]').textContent = "10K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${8 * discount} `;
                break;

            case "1":
                this.#internals.shadowRoot.querySelector('div[class="pageviews"]').textContent = "50K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${12 * discount} `;
                break;

            case "2":
                this.#internals.shadowRoot.querySelector('div[class="pageviews"]').textContent = "100K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${16 * discount} `;
                break;

            case "3":
                this.#internals.shadowRoot.querySelector('div[class="pageviews"]').textContent = "500K PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${24 * discount} `;
                break;

            case "4":
                this.#internals.shadowRoot.querySelector('div[class="pageviews"]').textContent = "1M PAGEVIEWS";
                this.#internals.shadowRoot.querySelector('span[class="cost"]').textContent = `\$${36 * discount} `;
            default:
                break
        }
    }
    getDiscount = (discountPercentage) => {
        let discount = 1;
        const discountAmount = (discountPercentage / 100);
        if (this.#internals.shadowRoot.querySelector("input[id='billing-yearly']").checked == true) {
            discount -= discountAmount;
        }
        return discount;
    }

}
if (!customElements.get("interactive-pricing-component")) {
    customElements.define("interactive-pricing-component", InteractivePricingComponent);
}
