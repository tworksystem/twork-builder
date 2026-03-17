import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { image, imageId, alt, url, linkTarget, linkRel, imageHeight } = attributes;

    if (!image) {
        return null;
    }

    const blockProps = useBlockProps.save({
        className: 'twork-tele-store-btn-wrapper'
    });

    const href = url || '#';
    const rel = linkRel || 'noopener noreferrer';
    const target = linkTarget || '_blank';

    return (
        <div {...blockProps}>
            <a
                href={href}
                className="store-btn store-btn-image"
                target={target}
                rel={rel}
            >
                <img
                    src={image}
                    alt={alt || ''}
                    className="store-btn-img"
                    style={{
                        height: `${imageHeight}px`,
                        width: 'auto',
                        display: 'block'
                    }}
                />
            </a>
        </div>
    );
}
