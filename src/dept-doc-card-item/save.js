import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { imageUrl, name, specialization, qualifications, profileUrl } = attributes;
    const blockProps = useBlockProps.save({ className: 'doc-card' });

    return (
        <div {...blockProps}>
            {imageUrl ? (
                <img decoding="async" src={imageUrl} alt={name} className="doc-img" />
            ) : (
                <div className="doc-img doc-img-placeholder" aria-hidden="true" />
            )}
            <div className="doc-info">
                <h4>{name}</h4>
                <span>{specialization}</span>
                <p>{qualifications}</p>
            </div>
            <a href={profileUrl || '#'} className="doc-btn">View Profile</a>
        </div>
    );
}
