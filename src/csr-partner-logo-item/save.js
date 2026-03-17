import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { logoUrl, logoAlt, linkUrl, linkTarget, linkRel } = attributes;

    const blockProps = useBlockProps.save({
        className: 'partner-logo-wrap csr-partner-logo-wrap'
    });

    if (!logoUrl) return null;

    const img = (
        <img
            src={logoUrl}
            alt={logoAlt || ''}
            className="partner-logo"
            loading="lazy"
            decoding="async"
        />
    );

    if (linkUrl) {
        return (
            <div {...blockProps}>
                <a
                    href={linkUrl}
                    target={linkTarget || '_blank'}
                    rel={linkRel || 'noopener noreferrer'}
                    className="csr-partner-logo-link"
                >
                    {img}
                </a>
            </div>
        );
    }

    return (
        <div {...blockProps}>
            {img}
        </div>
    );
}
