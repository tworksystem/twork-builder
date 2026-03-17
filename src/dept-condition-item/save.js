import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { icon, title } = attributes;
    const blockProps = useBlockProps.save({ className: 'condition-card' });

    return (
        <div {...blockProps}>
            <i className={`fas ${icon}`} />
            <h4>{title}</h4>
        </div>
    );
}
