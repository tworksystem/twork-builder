/**
 * Twork Blog Section – Editor
 * Blog layout with featured post, grid, sidebar widgets, and pagination.
 * Uses dynamic PHP render (ServerSideRender), similar to updates-section.
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    __experimentalDivider as Divider
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

export default function Edit({ attributes, setAttributes }) {
    const {
        postsPerPage,
        orderBy,
        order,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        showFeatured,
        featuredPostId,
        showGrid,
        showSidebar,
        showPagination,
        showSearchWidget,
        searchTitle,
        showCategoriesWidget,
        categoriesTitle,
        showRecentWidget,
        recentTitle,
        recentItems,
        recentSource,
        recentCategoryId,
        recentPostIds,
        showTagsWidget,
        tagsTitle,
        categoriesInclude,
        tagsInclude,
        excerptLength,
        readMoreLabel
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-blog-section-editor',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Query Settings', 'twork-builder')}
                    initialOpen={true}
                >
                    <RangeControl
                        label={__('Posts per page (grid)', 'twork-builder')}
                        value={postsPerPage}
                        onChange={(val) => setAttributes({ postsPerPage: val })}
                        min={1}
                        max={12}
                    />
                    <SelectControl
                        label={__('Order by', 'twork-builder')}
                        value={orderBy}
                        options={[
                            { label: __('Date', 'twork-builder'), value: 'date' },
                            { label: __('Title', 'twork-builder'), value: 'title' },
                            { label: __('Comment count', 'twork-builder'), value: 'comment_count' }
                        ]}
                        onChange={(val) => setAttributes({ orderBy: val })}
                    />
                    <SelectControl
                        label={__('Order', 'twork-builder')}
                        value={order}
                        options={[
                            { label: __('Descending', 'twork-builder'), value: 'DESC' },
                            { label: __('Ascending', 'twork-builder'), value: 'ASC' }
                        ]}
                        onChange={(val) => setAttributes({ order: val })}
                    />
                    <TextControl
                        label={__('Featured post ID (optional)', 'twork-builder')}
                        value={featuredPostId ? String(featuredPostId) : ''}
                        onChange={(val) =>
                            setAttributes({
                                featuredPostId: val ? parseInt(val, 10) || 0 : 0,
                            })
                        }
                        help={__('Leave empty to use the latest post as featured.', 'twork-builder')}
                    />
                    <RangeControl
                        label={__('Excerpt length (words)', 'twork-builder')}
                        value={excerptLength}
                        onChange={(val) => setAttributes({ excerptLength: val })}
                        min={10}
                        max={80}
                        step={5}
                    />
                    <TextControl
                        label={__('Read more label', 'twork-builder')}
                        value={readMoreLabel}
                        onChange={(val) => setAttributes({ readMoreLabel: val })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Layout', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show featured post', 'twork-builder')}
                        checked={showFeatured}
                        onChange={(val) => setAttributes({ showFeatured: val })}
                    />
                    <ToggleControl
                        label={__('Show post grid', 'twork-builder')}
                        checked={showGrid}
                        onChange={(val) => setAttributes({ showGrid: val })}
                    />
                    <ToggleControl
                        label={__('Show sidebar', 'twork-builder')}
                        checked={showSidebar}
                        onChange={(val) => setAttributes({ showSidebar: val })}
                    />
                    <ToggleControl
                        label={__('Show pagination', 'twork-builder')}
                        checked={showPagination}
                        onChange={(val) => setAttributes({ showPagination: val })}
                    />
                    <Divider />
                    <RangeControl
                        label={__('Max width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1600}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={60}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Sidebar Widgets', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show search', 'twork-builder')}
                        checked={showSearchWidget}
                        onChange={(val) => setAttributes({ showSearchWidget: val })}
                    />
                    {showSearchWidget && (
                        <TextControl
                            label={__('Search title', 'twork-builder')}
                            value={searchTitle}
                            onChange={(val) => setAttributes({ searchTitle: val })}
                        />
                    )}

                    <Divider />

                    <ToggleControl
                        label={__('Show categories', 'twork-builder')}
                        checked={showCategoriesWidget}
                        onChange={(val) => setAttributes({ showCategoriesWidget: val })}
                    />
                    {showCategoriesWidget && (
                        <TextControl
                            label={__('Categories title', 'twork-builder')}
                            value={categoriesTitle}
                            onChange={(val) => setAttributes({ categoriesTitle: val })}
                            help={__('Heading for the categories widget.', 'twork-builder')}
                        />
                    )}
                    {showCategoriesWidget && (
                        <TextControl
                            label={__('Limit categories (IDs, comma separated)', 'twork-builder')}
                            value={categoriesInclude}
                            onChange={(val) => setAttributes({ categoriesInclude: val })}
                            help={__('Optional: show only these category IDs. Leave empty for all.', 'twork-builder')}
                        />
                    )}

                    <Divider />

                    <ToggleControl
                        label={__('Show recent posts', 'twork-builder')}
                        checked={showRecentWidget}
                        onChange={(val) => setAttributes({ showRecentWidget: val })}
                    />
                    {showRecentWidget && (
                        <>
                            <TextControl
                                label={__('Recent posts title', 'twork-builder')}
                                value={recentTitle}
                                onChange={(val) => setAttributes({ recentTitle: val })}
                            />
                            <SelectControl
                                label={__('Recent posts source', 'twork-builder')}
                                value={recentSource}
                                options={[
                                    { label: __('Latest posts', 'twork-builder'), value: 'latest' },
                                    { label: __('By category', 'twork-builder'), value: 'category' },
                                    { label: __('Specific posts (IDs)', 'twork-builder'), value: 'ids' },
                                ]}
                                onChange={(val) => setAttributes({ recentSource: val })}
                            />
                            {recentSource !== 'ids' && (
                                <RangeControl
                                    label={__('Number of recent posts', 'twork-builder')}
                                    value={recentItems}
                                    onChange={(val) => setAttributes({ recentItems: val })}
                                    min={1}
                                    max={6}
                                />
                            )}
                            {recentSource === 'category' && (
                                <TextControl
                                    label={__('Recent category ID', 'twork-builder')}
                                    value={recentCategoryId ? String(recentCategoryId) : ''}
                                    onChange={(val) =>
                                        setAttributes({
                                            recentCategoryId: val ? parseInt(val, 10) || 0 : 0,
                                        })
                                    }
                                    help={__('Filter recent posts widget by a single category ID.', 'twork-builder')}
                                />
                            )}
                            {recentSource === 'ids' && (
                                <TextControl
                                    label={__('Recent post IDs (comma separated)', 'twork-builder')}
                                    value={recentPostIds}
                                    onChange={(val) => setAttributes({ recentPostIds: val })}
                                    help={__('Specify exact posts for the recent widget. Ignores count above.', 'twork-builder')}
                                />
                            )}
                        </>
                    )}

                    <Divider />

                    <ToggleControl
                        label={__('Show tags cloud', 'twork-builder')}
                        checked={showTagsWidget}
                        onChange={(val) => setAttributes({ showTagsWidget: val })}
                    />
                    {showTagsWidget && (
                        <TextControl
                            label={__('Tags title', 'twork-builder')}
                            value={tagsTitle}
                            onChange={(val) => setAttributes({ tagsTitle: val })}
                            help={__('Heading for the tags widget.', 'twork-builder')}
                        />
                    )}
                    {showTagsWidget && (
                        <TextControl
                            label={__('Limit tags (IDs or slugs, comma separated)', 'twork-builder')}
                            value={tagsInclude}
                            onChange={(val) => setAttributes({ tagsInclude: val })}
                            help={__('Optional: show only these tags. Leave empty for popular tags by count.', 'twork-builder')}
                        />
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Background', 'twork-builder')}
                    initialOpen={false}
                >
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(event) =>
                            setAttributes({ backgroundColor: event.target.value })
                        }
                        aria-label={__('Background color', 'twork-builder')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <ServerSideRender
                    block={metadata.name}
                    attributes={attributes}
                />
            </div>
        </>
    );
}

