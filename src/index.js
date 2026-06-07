/**
 * Main block entry imports.
 *
 * Keep explicit imports here when you want guaranteed registration from a
 * single entry bundle.
 *
 * Maintainer note:
 * Runtime block registration still happens in twork-builder.php
 * (see twork_builder_init_blocks), which scans build/* and calls
 * register_block_type() from block metadata.
 */

import './twork-header';
import './twork-nav-item';

// Brand home page blocks (industry-agnostic naming)
import './brand-header';
import './brand-nav-item';
import './hero-banner-carousel';
import './hero-banner-slide';
import './image-card-carousel';
import './image-card-slide';
import './numbered-features-grid';
import './numbered-feature-item';
import './category-card-grid';
import './category-card';
import './logo-showcase-section';
import './logo-showcase-item';
import './news-card-grid';
import './news-card';
import './review-carousel';
import './review-card';
import './split-promo-section';
import './faq-accordion-section';
import './faq-accordion-item';
import './subscribe-bar';
import './brand-footer';
import './brand-footer-info-card';
import './brand-footer-column';
