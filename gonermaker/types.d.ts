declare namespace GM {
    interface BuildImage {
        pull: false
        path: string
        base: string
        tag: string
        args: object
        distrobox?: Record<string, any>
        children: BuildImage[]
    }
    
    interface PullImage {
        pull: true
        tag: string
        children: BuildImage[]
    }
    
    type Image = BuildImage | PullImage
}

