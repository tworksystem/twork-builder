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
