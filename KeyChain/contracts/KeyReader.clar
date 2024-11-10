(define-data-var connections (list 50 principal))

(define-public (add-key (keyid principal))
    (match (index-of? connections keyid) index (none) (append connections keyid))
)

(define-public (acceptable-keys (business principal))
    )



;; (match indexof 0 stuff_to_do_if_0 else