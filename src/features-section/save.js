import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        sectionId,
        containerClass,
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        containerMaxWidth,
        containerPadding,
        gridMinItemWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: containerClass || 'container',
        id: sectionId || undefined,
    });

    return (
        <section {...blockProps}>
            <div
                className="features-grid twork-features-section-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fit, minmax(${gridMinItemWidth}px, 1fr))`,
                    gap: `${gap}px`,
                }}
                data-columns={columns}
                data-columns-tablet={columnsTablet}
                data-columns-mobile={columnsMobile}
            >
                <InnerBlocks.Content />
            </div>
        </section>
    );
}
