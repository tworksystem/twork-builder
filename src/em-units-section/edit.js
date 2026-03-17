/**
 * Twork Emergency Units Section – Editor
 * Specialized Emergency Units – content from WordPress Posts. Dynamic block (PHP render).
 */
import { __ } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import {
    useBlockProps,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    Button,
    BaseControl,
    Modal,
    __experimentalDivider as Divider
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit({ attributes, setAttributes }) {
    const {
        source,
        categoryId,
        postIds,
        numberOfItems,
        orderBy,
        order,
        backgroundColor,
        paddingTop,
        paddingBottom,
        showSectionHeader,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        headerMaxWidth,
        headerMarginBottom,
        containerMaxWidth,
        containerPadding,
        minColumnWidth,
        gap,
        imageHeight,
        bodyPadding,
        showUnitLink,
        defaultLinkText,
        linkTextColor,
        linkFontSize,
        linkFontWeight,
        linkTextTransform,
        animationOnScroll,
        animationType
    } = attributes;

    const [postPickerOpen, setPostPickerOpen] = useState(false);
    const [postSearch, setPostSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const categories = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'category', {
            per_page: -1,
            orderby: 'name',
            order: 'asc'
        });
    }, []);

    const categoryOptions = useMemo(() => {
        const opts = [{ label: __('— Select Category —', 'twork-builder'), value: 0 }];
        if (categories) {
            categories.forEach((cat) => {
                opts.push({ label: cat.name, value: cat.id });
            });
        }
        return opts;
    }, [categories]);

    const selectedPosts = useSelect((select) => {
        if (!postIds || postIds.length === 0) return [];
        return select('core').getEntityRecords('postType', 'post', {
            include: postIds,
            per_page: 99,
            orderby: 'include'
        });
    }, [postIds]);

    const doPostSearch = () => {
        if (!postSearch.trim()) {
            setSearchResults([]);
            return;
        }
        setSearching(true);
        apiFetch({
            path: `wp/v2/posts?search=${encodeURIComponent(postSearch)}&per_page=15&_fields=id,title,date`
        })
            .then((posts) => setSearchResults(posts || []))
            .catch(() => setSearchResults([]))
            .finally(() => setSearching(false));
    };

    const addPost = (id) => {
        const ids = Array.isArray(postIds) ? [...postIds] : [];
        if (!ids.includes(id)) {
            ids.push(id);
            setAttributes({ postIds: ids, source: 'ids' });
        }
        setPostPickerOpen(false);
        setPostSearch('');
        setSearchResults([]);
    };

    const removePost = (id) => {
        const ids = (Array.isArray(postIds) ? [...postIds] : []).filter((i) => i !== id);
        setAttributes({ postIds: ids });
    };

    const blockProps = useBlockProps({
        className: 'twork-em-units-section-editor',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative'
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Posts Source', 'twork-builder')} initialOpen={true}>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#666' }}>
                        {__('Unit cards are loaded from WordPress Posts. Set Featured Image, Title, Excerpt, and post meta "Emergency Unit Link Text" (and optional "Link URL") on each post.', 'twork-builder')}
                    </p>
                    <SelectControl
                        label={__('Source', 'twork-builder')}
                        value={source}
                        options={[
                            { label: __('Latest Posts', 'twork-builder'), value: 'recent' },
                            { label: __('By Category', 'twork-builder'), value: 'category' },
                            { label: __('Select Specific Posts', 'twork-builder'), value: 'ids' }
                        ]}
                        onChange={(val) => setAttributes({ source: val })}
                    />
                    {(source === 'recent' || source === 'category') && (
                        <>
                            {source === 'category' && (
                                <SelectControl
                                    label={__('Category', 'twork-builder')}
                                    value={categoryId || 0}
                                    options={categoryOptions}
                                    onChange={(val) => setAttributes({ categoryId: parseInt(val, 10) || 0 })}
                                />
                            )}
                            <RangeControl
                                label={__('Number of Units', 'twork-builder')}
                                value={numberOfItems}
                                onChange={(val) => setAttributes({ numberOfItems: val })}
                                min={1}
                                max={12}
                                step={1}
                            />
                            <SelectControl
                                label={__('Order By', 'twork-builder')}
                                value={orderBy}
                                options={[
                                    { label: __('Date', 'twork-builder'), value: 'date' },
                                    { label: __('Title', 'twork-builder'), value: 'title' },
                                    { label: __('Random', 'twork-builder'), value: 'rand' }
                                ]}
                                onChange={(val) => setAttributes({ orderBy: val })}
                            />
                            <SelectControl
                                label={__('Order', 'twork-builder')}
                                value={order}
                                options={[
                                    { label: __('Newest first', 'twork-builder'), value: 'DESC' },
                                    { label: __('Oldest first', 'twork-builder'), value: 'ASC' }
                                ]}
                                onChange={(val) => setAttributes({ order: val })}
                            />
                        </>
                    )}
                    {source === 'ids' && (
                        <>
                            <BaseControl label={__('Selected Posts', 'twork-builder')}>
                                {selectedPosts && selectedPosts.length > 0 ? (
                                    <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '13px' }}>
                                        {selectedPosts.map((p) => (
                                            <li key={p.id} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ flex: 1 }}>{p.title?.rendered || __('(No title)', 'twork-builder')}</span>
                                                <Button isDestructive isSmall onClick={() => removePost(p.id)}>
                                                    {__('Remove', 'twork-builder')}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ margin: '8px 0', color: '#666', fontSize: '13px' }}>
                                        {__('No posts selected.', 'twork-builder')}
                                    </p>
                                )}
                                <Button isSecondary isSmall onClick={() => setPostPickerOpen(true)} style={{ marginTop: '8px' }}>
                                    {__('Add Posts', 'twork-builder')}
                                </Button>
                            </BaseControl>
                        </>
                    )}
                </PanelBody>

                {postPickerOpen && (
                    <Modal
                        title={__('Select Posts', 'twork-builder')}
                        onRequestClose={() => {
                            setPostPickerOpen(false);
                            setPostSearch('');
                            setSearchResults([]);
                        }}
                        style={{ maxWidth: '400px' }}
                    >
                        <div style={{ marginBottom: '16px' }}>
                            <TextControl
                                label={__('Search posts', 'twork-builder')}
                                value={postSearch}
                                onChange={(val) => setPostSearch(val)}
                                placeholder={__('Type to search...', 'twork-builder')}
                                onKeyDown={(e) => e.key === 'Enter' && doPostSearch()}
                            />
                            <Button isSecondary onClick={doPostSearch} isBusy={searching} style={{ marginTop: '8px' }}>
                                {__('Search', 'twork-builder')}
                            </Button>
                        </div>
                        {searchResults.length > 0 && (
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '300px', overflowY: 'auto' }}>
                                {searchResults.map((p) => (
                                    <li
                                        key={p.id}
                                        style={{
                                            padding: '10px 12px',
                                            borderBottom: '1px solid #eee',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <span style={{ fontSize: '14px' }}>
                                            {p.title?.rendered || __('(No title)', 'twork-builder')}
                                            {p.date && (
                                                <span style={{ color: '#666', fontSize: '12px', marginLeft: '8px' }}>
                                                    {new Date(p.date).getFullYear()}
                                                </span>
                                            )}
                                        </span>
                                        <Button
                                            isPrimary
                                            isSmall
                                            onClick={() => addPost(p.id)}
                                            disabled={postIds && postIds.includes(p.id)}
                                        >
                                            {postIds && postIds.includes(p.id) ? __('Added', 'twork-builder') : __('Add', 'twork-builder')}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {postSearch && searchResults.length === 0 && !searching && (
                            <p style={{ color: '#666', fontSize: '13px' }}>{__('No posts found.', 'twork-builder')}</p>
                        )}
                    </Modal>
                )}

                <PanelBody title={__('Section Header', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Section Header', 'twork-builder')}
                        checked={showSectionHeader}
                        onChange={(val) => setAttributes({ showSectionHeader: val })}
                    />
                    {showSectionHeader && (
                        <>
                            <TextControl
                                label={__('Title', 'twork-builder')}
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                            />
                            <PanelColorSettings
                                title={__('Title Color', 'twork-builder')}
                                colorSettings={[{ value: sectionTitleColor, onChange: (val) => setAttributes({ sectionTitleColor: val }), label: __('Title', 'twork-builder') }]}
                            />
                            <RangeControl
                                label={__('Title Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1.5}
                                max={3.5}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Title Font Weight', 'twork-builder')}
                                value={sectionTitleFontWeight}
                                onChange={(val) => setAttributes({ sectionTitleFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />
                            <Divider />
                            <TextControl
                                label={__('Subtitle', 'twork-builder')}
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                multiline
                            />
                            <PanelColorSettings
                                title={__('Subtitle Color', 'twork-builder')}
                                colorSettings={[{ value: sectionSubtitleColor, onChange: (val) => setAttributes({ sectionSubtitleColor: val }), label: __('Subtitle', 'twork-builder') }]}
                            />
                            <RangeControl
                                label={__('Subtitle Font Size (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSize}
                                onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })}
                                min={0.85}
                                max={1.3}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Header Max Width (px)', 'twork-builder')}
                                value={headerMaxWidth}
                                onChange={(val) => setAttributes({ headerMaxWidth: val })}
                                min={500}
                                max={900}
                                step={10}
                            />
                            <RangeControl
                                label={__('Header Margin Bottom (px)', 'twork-builder')}
                                value={headerMarginBottom}
                                onChange={(val) => setAttributes({ headerMarginBottom: val })}
                                min={20}
                                max={80}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Layout & Cards', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Min Column Width (px)', 'twork-builder')}
                        value={minColumnWidth}
                        onChange={(val) => setAttributes({ minColumnWidth: val })}
                        min={260}
                        max={400}
                        step={10}
                    />
                    <RangeControl
                        label={__('Gap (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={15}
                        max={50}
                        step={5}
                    />
                    <RangeControl
                        label={__('Image Height (px)', 'twork-builder')}
                        value={imageHeight}
                        onChange={(val) => setAttributes({ imageHeight: val })}
                        min={160}
                        max={320}
                        step={10}
                    />
                    <RangeControl
                        label={__('Card Body Padding (px)', 'twork-builder')}
                        value={bodyPadding}
                        onChange={(val) => setAttributes({ bodyPadding: val })}
                        min={15}
                        max={40}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Unit link (em-unit-link)', 'twork-builder')} initialOpen={false}>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#666' }}>
                        {__('Label at the bottom of each card. Per-post text is set in Post meta "Emergency Unit Link Text"; use the default below when a post has none.', 'twork-builder')}
                    </p>
                    <ToggleControl
                        label={__('Show unit link text', 'twork-builder')}
                        checked={showUnitLink}
                        onChange={(val) => setAttributes({ showUnitLink: val })}
                    />
                    {showUnitLink && (
                        <>
                            <TextControl
                                label={__('Default link text', 'twork-builder')}
                                value={defaultLinkText || ''}
                                onChange={(val) => setAttributes({ defaultLinkText: val || '' })}
                                placeholder={__('e.g. Learn more, Level 1 Care', 'twork-builder')}
                                help={__('Used when a post has no "Emergency Unit Link Text" meta.', 'twork-builder')}
                            />
                            <PanelColorSettings
                                title={__('Link color', 'twork-builder')}
                                colorSettings={[{ value: linkTextColor, onChange: (val) => setAttributes({ linkTextColor: val }), label: __('Color', 'twork-builder') }]}
                            />
                            <RangeControl
                                label={__('Font size (rem)', 'twork-builder')}
                                value={linkFontSize}
                                onChange={(val) => setAttributes({ linkFontSize: val })}
                                min={0.75}
                                max={1.3}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Font weight', 'twork-builder')}
                                value={linkFontWeight}
                                onChange={(val) => setAttributes({ linkFontWeight: val })}
                                min={400}
                                max={900}
                                step={100}
                            />
                            <SelectControl
                                label={__('Text transform', 'twork-builder')}
                                value={linkTextTransform}
                                options={[
                                    { label: __('None', 'twork-builder'), value: 'none' },
                                    { label: __('Uppercase', 'twork-builder'), value: 'uppercase' },
                                    { label: __('Lowercase', 'twork-builder'), value: 'lowercase' },
                                    { label: __('Capitalize', 'twork-builder'), value: 'capitalize' }
                                ]}
                                onChange={(val) => setAttributes({ linkTextTransform: val })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={60}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable scroll animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                    {animationOnScroll && (
                        <SelectControl
                            label={__('Animation type', 'twork-builder')}
                            value={animationType}
                            options={[
                                { label: __('Fade up', 'twork-builder'), value: 'fade-up' },
                                { label: __('Fade in', 'twork-builder'), value: 'fadeIn' },
                                { label: __('None', 'twork-builder'), value: 'none' }
                            ]}
                            onChange={(val) => setAttributes({ animationType: val })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div
                    className="em-container"
                    style={{
                        maxWidth: `${containerMaxWidth}px`,
                        margin: '0 auto',
                        padding: `0 ${containerPadding}px`,
                        position: 'relative'
                    }}
                >
                    <div
                        className="editor-label"
                        style={{
                            textAlign: 'center',
                            padding: '10px',
                            background: '#2271b1',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            marginBottom: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        {__('Emergency Units Section (Preview)', 'twork-builder')}
                    </div>
                    <ServerSideRender
                        block="twork/em-units-section"
                        attributes={attributes}
                        EmptyResponsePlaceholder={() => (
                            <div
                                style={{
                                    padding: '40px',
                                    textAlign: 'center',
                                    background: '#fffbf7',
                                    border: '2px dashed #e0e0e0',
                                    borderRadius: '8px',
                                    color: '#666',
                                    fontSize: '14px'
                                }}
                            >
                                {source === 'recent' && numberOfItems > 0
                                    ? __('Loading posts...', 'twork-builder')
                                    : source === 'category' && !categoryId
                                    ? __('Select a category in block settings.', 'twork-builder')
                                    : source === 'ids' && (!postIds || postIds.length === 0)
                                    ? __('Add posts in block settings.', 'twork-builder')
                                    : __('No posts found. Add posts and set Featured Image, Excerpt, and "Emergency Unit Link Text" meta.', 'twork-builder')}
                            </div>
                        )}
                    />
                </div>
            </div>
        </>
    );
}
