<template>
    <section class="slide-modal">
        <div class="base-container-1">
            <base-card>
                <div>
                    <button>All</button>
                    <button>UI</button>
                    <button>UX</button>
                    <button>Enhancement</button>
                    <button>Bug</button>
                    <button>Feature</button>
                </div>
            </base-card>
        </div>

         <div>
            <base-card>
                <div>
                    <h3>Roadmap</h3>
                </div>
            </base-card>
        </div>
    </section>
</template>

<style scoped>
.slide-modal {
    background-color: rgb(247,248,253);
    width: 260px ;
    height: 100%;
    color: black;
    z-index: 2;
    right: 0;
    position: absolute;
    overflow: hidden;
}

.base-container-1 {
    margin-top: 90px;
    
}
</style>