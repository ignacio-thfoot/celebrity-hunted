<div class="b--header-a">
    <div class="f--container">
        <div class="f--row">
            <div class="f--col-12">
                <div class="b--header-a__content">
                    <a class="b--brand-a" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="SEI home">
                        <img class="b--brand-a__media" src="https://webpackdev.wpengine.com//wp-content/themes/webpack-wp-theme/screenshot.jpg" alt="">
                    </a>
                    <a href="#" class="b--nav__search d-xl-none d-block js--search-icon" aria-label="search in SEI">
                    <i class="b--nav__search__icon sei sei-search"></i>
                    </a>
                    <div class="b--header-a__content__burger">
                        <button class="b--burger-a">
                            <span class="b--burger-a__dash"></span>
                            <span class="b--burger-a__dash"></span>
                            <span class="b--burger-a__dash"></span>
                        </button>
                    </div>
                    <nav class="b--nav-a">
                        <ul class="b--nav-a__list-group">
                        <?php $active = ((wp_get_post_parent_id(0) == 0) || wp_get_post_parent_id(0) == 342)? 'b--nav-a__list-group__list-item__link--is-visited' :  '' ?>
                            <li class="b--nav-a__list-group__list-item">
                                <a href="" class="b--nav-a__list-group__list-item__link js--toggle-nav <?php if(is_page_template('page-newsroom.php') || is_page_template('page-about-sei.php') || is_page_template('page-awards-recognition.php') || is_page_template('page-leadership-team.php')){ echo "b--nav-a__list-group__list-item__link--is-visited" ; }?>" data-href="toggle-about">
                                    About
                                </a>
                                <div class="b--dropdown-menu-a b--dropdown-menu--secondary js--b--dropdown-menu" id="toggle-about">
                                    <div class="f--container">
                                        <div class="f--row">
                                            <div class="f--col-3 f--col-tabletl-12">
                                                <span class="b--dropdown-menu-a__title f--font-third">About</span>
                                            </div>
                                            <div class="f--col-9 f--col-tabletl-12">
                                                <div class="f--row">
                                                    <div class="f--col-12">
                                                        <?php $location = 'navbar-about'; $menuClass ='';?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i class="b--dropdown-menu-a__list-group__list-item__link__arrow sei sei-dropdown"></i>
                            </li>
                            <li class="b--nav-a__list-group__list-item">
                                <a href="" class="b--nav-a__list-group__list-item__link js--toggle-nav <?php if(is_singular('capability')){ echo "b--nav-a__list-group__list-item__link--is-visited" ; }?>" data-href="toggle-capabilities">
                                    Capabilities
                                </a>
                                <div class="b--dropdown-menu-a js--b--dropdown-menu" id="toggle-capabilities">
                                    <div class="f--container">
                                        <div class="f--row">
                                            <div class="f--col-3 f--col-tabletl-12">
                                                <span class="b--dropdown-menu-a__title f--font-third">Capabilities</span>
                                            </div>
                                            <div class="f--col-9 f--col-tabletl-12">
                                                <div class="f--row">
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-primary'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-secondary'; $menuClass =''; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-third'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-fourth'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-fifth'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i class="b--nav-a__list-group__list-item__link__arrow sei sei-dropdown"></i>
                            </li>
                            <li class="b--nav-a__list-group__list-item">
                                <a href="" class="b--nav-a__list-group__list-item__link js--toggle-nav <?php if(is_singular('industry')){ echo "b--nav-a__list-group__list-item__link--is-visited" ; }?>" data-href="toggle-industries">
                                    Industries
                                </a>
                                <div class="b--dropdown-menu-a js--b--dropdown-menu" id="toggle-industries">
                                    <div class="f--container">
                                        <div class="f--row">
                                            <div class="f--col-3 f--col-tabletl-12">
                                                <span class="b--dropdown-menu-a__title f--font-third">Industries</span>
                                            </div>
                                            <div class="f--col-9 f--col-tabletl-12">
                                                <div class="f--row">
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-sixth'; $menuClass = 'b--dropdown-menu-a__list-group--secondary';?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-seventh'; $menuClass = '';?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-eleventh'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-tenth'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-eighth'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                    <div class="f--col-4 f--col-tabletl-12">
                                                        <?php $location = 'navbar-ninth'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i class="b--nav__list-group__list-item__link__arrow sei sei-dropdown"></i>
                            </li>
                            <li class="b--nav__list-group__list-item"><a href="<?php echo esc_url( home_url('/insights' ) );?>" class="b--nav__list-group__list-item__link <?php if(is_singular('insight') || is_author() || is_page('insights')){ echo "b--nav__list-group__list-item__link--is-visited" ; }?>">Insights</a></li>
                            <li class="b--nav__list-group__list-item">
                                <a href="" class="b--nav__list-group__list-item__link js--toggle-nav <?php if(is_page_template('page-job-positions-single.php') || is_page_template('page-job-positions-single-apply.php') || is_page_template('page-find-your-career.php') || is_page_template('page-all-open-positions.php')){ echo "b--nav__list-group__list-item__link--is-visited" ; }?>" data-href="toggle-careers">
                                    Careers
                                </a>
                                <div class="b--dropdown-menu b--dropdown-menu--primary js--b--dropdown-menu" id="toggle-careers">
                                    <div class="f--container">
                                        <div class="f--row">
                                            <div class="f--col-3 f--col-tabletl-12">
                                                <span class="b--dropdown-menu__title f--font-third">Careers</span>
                                            </div>
                                            <div class="f--col-9 f--col-tabletl-12">
                                                <div class="f--row">
                                                    <div class="f--col-12">
                                                        <?php $location = 'navbar-careers'; ?>
                                                        <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i class="b--nav__list-group__list-item__link__arrow sei sei-dropdown"></i>
                            </li>
                            <li class="b--nav__list-group__list-item">
                                <a href="" class="b--nav__list-group__list-item__link js--toggle-nav <?php if(is_singular('location')){ echo "b--nav__list-group__list-item__link--is-visited" ; }?>" data-href="toggle-locations">
                                    Locations
                                </a>
                                <div class="b--dropdown-menu b--dropdown-menu--primary js--b--dropdown-menu" id="toggle-locations">
                                    <div class="f--container">
                                        <div class="f--row">
                                            <div class="f--col-3 f--col-tabletl-12">
                                                <span class="b--dropdown-menu__title f--font-third">Locations</span>
                                            </div>
                                            <div class="f--col-9 f--col-tabletl-12">
                                                <?php $location = 'navbar-locations'; ?>
                                                <?php include( locate_template( 'modules/framework/header/navbar-three-content.php', false, false ) ); ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i class="b--nav__list-group__list-item__link__arrow sei sei-dropdown"></i>
                            </li>
                            <li class="b--nav__list-group__list-item">
                                <?php $tActive = is_page('talk-to-us') ? 'b--nav__list-group__list-item__link--is-visited' : ''?>
                                <a href="<?php echo esc_url( home_url('/talk-to-us' ) );?>" class="b--nav__list-group__list-item__link <?php echo $tActive ?>">Talk To Us</a>
                            </li>
                            <!-- js--search-icon -->
                            <li class="b--nav__list-group__list-item d-xl-block d-none">
                                <a href="#" class="b--nav__list-group__list-item__link js--search-icon" aria-label="search in SEI">
                                    <i class="b--nav__list-group__list-item__link__icon b--nav__list-group__list-item__link__icon--primary sei sei-search"></i>
                                    <i class="b--nav__list-group__list-item__link__icon b--nav__list-group__list-item__link__icon--secondary sei sei-close"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <!--  Search -->
    <?php get_template_part('search'); ?>
</div>



