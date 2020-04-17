import React, { Component } from "react";
import ReviewStars from "./ReviewStars";
import { animateScroll as scroll } from "react-scroll";
import VariantSelector from "../productAssets/VariantSelector";
import { connect } from "react-redux";
import commerce from '../../lib/commerce';

class ProductDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOptions: props.product.variants.reduce((acc, variant) => ({
        ...acc,
        [variant.id]: variant.options[0].id,
      }), {}),
    }
  }

  /**
  * Handle click on review to scroll to review section
  */
  onReviewClick() {
    const section = document.querySelector("#reviews");

    if (section) {
      scroll.scrollTo(section.offsetTop - 130, {
        smooth: "easeInOutQuint"
      });
    }
  }

  /**
  * On selecting variant
  */
  handleSelectOption = (variantId, optionId) => {
    this.setState({ selectedOptions: {
      ...this.state.selectedOptions,
      [variantId]: optionId,
    }});
  }

  getPrice = () => {
    const { price: { raw: base }, variants } = this.props.product;
    const { selectedOptions } = this.state;

    if (!selectedOptions || typeof selectedOptions !== 'object') {
      return base;
    }

    const options = Object.entries(selectedOptions);
    return base + options.reduce((acc, [variant, option]) => {
      const variantDetail = variants.find(candidate => candidate.id === variant);
      if (!variantDetail) {
        return acc;
      }
      const optionDetail = variantDetail.options.find(candidate => candidate.id === option);
      if (!optionDetail) {
        return acc;
      }

      return acc + optionDetail.price.raw;
    }, 0);
  }

  /**
  * Add to Cart
  */
  addToCart = () => {
    const { product, refreshCart } = this.props;
    const { selectedOptions } = this.state;

    commerce.cart.add(product.id, 1, selectedOptions)
      .then(resp => {
        // refreshCart(() => {
        //   toggleCart(true);
        // })
      })
  }

  render() {
    const { product } = this.props;
    const { name, description, variants, formatted_with_symbol: price } = product;
    const { selectedOptions } = this.state;
    const reg = /(<([^>]+)>)/ig;

    return (
      <div>

        {/* Product Summary */}
        <div onClick={this.onReviewClick} className="cursor-pointer">
          <ReviewStars count={4.5} />
        </div>
        <p className="font-size-display3 font-family-secondary mt-2 mb-2">
          {name}
        </p>
        <div className="mb-4 pb-3 font-size-subheader">{(description || '').replace(reg, "")}</div>

        {/* Product Variant */}
          <div className="d-none d-sm-block">
            <VariantSelector
              className="mb-3"
              variants={variants}
              onSelectOption={this.handleSelectOption}
              selectedOptions={selectedOptions}
              // toggle={value =>
              //   this.setState({ selectedSize: value })
              // }
            />
          </div>

        {/* Add to Cart & Price */}
        <div className="d-flex py-4">
          <button onClick={this.addToCart} className="h-56 bg-black font-color-white pl-3 pr-4 d-flex align-items-center flex-grow-1">
            <span className="flex-grow-1 mr-3 text-center">
              Add to cart
            </span>
            <span className="border-left border-color-white pl-3">
            ${this.getPrice()}
            </span>
          </button>
        </div>

      </div>
    );
  }
}

export default connect(state => state)(ProductDetails);
