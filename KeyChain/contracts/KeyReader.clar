(define-data-var connections (list 50 principal) (list ))

(define-public (addKey (keyid principal))
    (let 
        ((index (index-of? connections keyid)))

    (if (is-none index) 
        (append connections keyid) 
        (ok connections)
    )
    (ok connections)
    )
)

(define-public (removeKey (keyid principal))
    (let 
        ((index (index-of? connections keyid)))

    (if (is-none index)
        (ok connections)
        (ok concat (slice? connections 0 index) (slice? connections index (+ (len connections) 1)))
    )
    (ok connections)
    )
)



;; (match indexof 0 stuff_to_do_if_0 else