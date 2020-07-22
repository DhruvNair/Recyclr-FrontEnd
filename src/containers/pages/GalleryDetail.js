
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import Lightbox from 'react-image-lightbox';
import './common.css';

const images = [
    '/assets/img/fruitcake.jpg',
    '/assets/img/napoleonshat.jpg',
    '/assets/img/tea-loaf.jpg',
    '/assets/img/magdalena.jpg',
    '/assets/img/marble-cake.jpg',
    '/assets/img/parkin.jpg',
];

// const thumbs = [
//     '/assets/img/fruitcake-thumb.jpg',
//     '/assets/img/napoleonshat-thumb.jpg',
//     '/assets/img/tea-loaf-thumb.jpg',
//     '/assets/img/magdalena-thumb.jpg',
//     '/assets/img/marble-cake-thumb.jpg',
//     '/assets/img/parkin-thumb.jpg',
// ]

class GalleryDetail extends Component {
    constructor(props) {
        super(props);
        this.onThumbClick = this.onThumbClick.bind(this);
        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    onThumbClick(index) {
        this.setState({ photoIndex: index });
        this.setState({ isOpen: true });
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        return (
            <div>
                <div className="row social-image-row gallery">
                    {
                        this.props.items.map((item, index) => {
                            return (
                                <div className="col-6" key={index}>
                                    <div onClick={() => {window.location=`/buy/product?id=${item._id}`}} className="hoverable">
                                        <img className="img-fluid border-radius" src={item.photo || 'https://www.oyorooms.com/officialoyoblog/wp-content/themes/inframe/assets/images/no-thumbnail-medium.png'} alt="thumbnail" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default injectIntl(GalleryDetail);