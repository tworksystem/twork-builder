import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { logoUrl, logoAlt, logoWidth = 0, logoHeight = 0, linkUrl, linkTarget, linkRel } = attributes;

    const blockProps = useBlockProps.save({
        className: 'partner-logo-wrap'
    });

    if (!logoUrl) return null;

    const logoStyle = {
        ...(logoWidth > 0 && { width: logoWidth + 'px', maxWidth: logoWidth + 'px' }),
        ...(logoHeight > 0 && { height: logoHeight + 'px' }),
        ...((logoWidth > 0 || logoHeight > 0) && { objectFit: 'contain' })
    };

    const img = (
        <img
            src={logoUrl}
            alt={logoAlt || ''}
            className="partner-logo"
            loading="lazy"
            decoding="async"
            style={Object.keys(logoStyle).length ? logoStyle : undefined}
        />
    );

    if (linkUrl) {
        return (
            <div {...blockProps}>
                <a
                    href={linkUrl}
                    target={linkTarget || '_blank'}
                    rel={linkRel || 'noopener noreferrer'}
                    className="affiliation-logo-link"
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
