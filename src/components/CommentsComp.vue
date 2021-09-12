<template>
<div class="heading flex flex-column">
    <div class="heading flex">
        <div class="user-info flex">
            <img :src="url" alt="user image">
            <div class="user-names flex flex-column">
                <h5> {{user.name}} </h5>
                <p> @{{user.username}} </p>
            </div>
        </div>

        <div class="reply">
            <span>Reply</span>
        </div>
    </div>

    <div class="content">
        <p>{{content}}</p>
    </div>
</div>
</template>

<script>
export default {
    props: ['id', 'content', 'user'], // user = { image: , name: , username:}
    data(){
        return{
            url: "." + this.user.image,
        }
    },
    computed:{
        userImgUrl(){
            return "." + this.user.image;
        }
    }
}
</script>

<style scoped>
/* .container{}o */
.heading {
    width: 100%;
    justify-content: space-between;
    /* margin-bottom: ; */
}
.user-names{
    margin: 10px;
}
img{
    margin: 10px;
}

.reply{
    margin-right: 30px;
    color: blue;
}

.content {
    margin: 20px 0px 10px 95px;
}

</style>