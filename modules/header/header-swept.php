<div class="b--header-a">
	<div class="b--header-a__content">
		<a class="b--brand-a" href="#">
			<img class="b--brand-a__media" src="<?= get_template_directory_uri() . '/theme/img/logo.png' ?>" alt="Logo">
		</a>
		<div class="b--nav-a">
			<button class="b--burger-a" aria-label="burger">
				<span class="b--burger-a__dash"></span>
				<span class="b--burger-a__dash"></span>
				<span class="b--burger-a__dash"></span>
			</button>
			<?php
				wp_nav_menu( array(
					'menu'   => 'navbar',
					'theme_location' => 'navbar',
					'menu_class' => 'b--nav-a__list-group',// ul Parent
                    'container' => false,
                    'current-menu-item' => 'active',
                    'list_item_class'  => 'b--nav-a__list-group__list-item', // ul li Parents
                    'link_class'   => 'b--nav-a__list-group__list-item__link', // ul li a,
                    'list_sub_item_class'  => 'b--dropdown-menu-a__list-item', // ul li ul li Childs
                    'link_sub_class'   => 'b--dropdown-menu-a__list-item__link', // ul li ul li a
				) );
			?>
		</div>
	</div>
</div>