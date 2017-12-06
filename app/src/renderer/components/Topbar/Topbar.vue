<template>
    <div id="topbar" class="shadow">
        <div class="row">
            <div class="column">
                <div class="logo">
                    <img src="./assets/icon.png">
                </div>
            </div>

            <div class="column align-right">
                <router-link to="/" exact>Play</router-link>
                <router-link to="/leaderboard">Leaderboards</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'topbar'
    };
</script>

<style scoped lang="scss">
    #topbar {
        background-color: #fff;
        padding: 20px;

        .logo {
            img {
                transition: all 0.3s;
                display: block;
                width: 25px;
                transform: scale(1.7);
                margin-left: 5px;
            }
        }

        a {
            display: inline-block;
            margin-left: 20px;
            color: $color-dark;

            &:active,
            &.router-link-active {
                @include gradient-text($gradient-secondary);
            }
        }
    }
</style>
