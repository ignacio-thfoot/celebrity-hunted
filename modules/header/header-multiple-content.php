<?php
  wp_nav_menu( array(
    'theme_location'  => $location,
    'container'       => false,
    'menu_class'      => 'menu',
    'fallback_cb'     => '__return_false',
    'items_wrap'      => '<ul class="b--dropdown-menu__list-group '. $menuClass .'">%3$s</ul>',
    'depth'           => 0,
    'walker'          => new My_Walker_Nav_Menu(),
    'list_item_class'  => 'b--dropdown-menu__list-group__list-item', // ul li
    'link_class'   => 'b--dropdown-menu__list-group__list-item__link', // ul li a
  ) );
?>