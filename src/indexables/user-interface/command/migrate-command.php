<?php

namespace Yoast\WP\SEO\Indexables\User_Interface\Command;

use WP_CLI\Utils;
use Yoast\WP\SEO\Commands\Command_Interface;
use Yoast\WP\SEO\Indexables\Application\Actions\Migration\Indexable_Action;
use Yoast\WP\SEO\Main;

/**
 * Command to generate indexables for all posts and terms.
 */
class Migrate_Command implements Command_Interface {

	/**
	 * @var Indexable_Action
	 */
	private $indexable_action;

	public function __construct(Indexable_Action $indexable_action ) {
		$this->indexable_action = $indexable_action;
	}

	/**
	 * Gets the namespace.
	 *
	 * @return string
	 */
	public static function get_namespace() {
		return Main::WP_CLI_NAMESPACE;
	}

	/**
	 * Indexes all your content to ensure the best performance.
	 *
	 * ## OPTIONS
	 *
	 * [--old-url]
	 * : The old URL we want to migrate from.
	 *
	 * [--new-url]
	 * : The new URL we want to migrate to.
	 *
	 * @when after_wp_load
	 *
	 * @param array|null $args       The arguments.
	 * @param array|null $assoc_args The associative arguments.
	 *
	 * @return void
	 */
	public function migrate( $args = null, $assoc_args = null ) {
		if ( ! isset( $assoc_args['old-url'] ) || ! isset( $assoc_args['new-url'] )  ) {
			return;
		}
		
		$total = $this->indexable_action->get_total_unmigrated();
		if ( $total > 0 ) {
			$limit    = $this->indexable_action->get_limit();
			$progress = Utils\make_progress_bar( 'Migrating indexables', $total );
			do {
				$indexables = $this->indexable_action->migrate( $assoc_args['old-url'], $assoc_args['new-url'] );
				$progress->tick( $indexables );
				\usleep( $interval );
				Utils\wp_clear_object_cache();
			} while ( $indexables >= $limit );
			$progress->finish();
		}
	}
}