(define-non-fungible-token keys uint)

(define-data-var nfts-minted uint u0)
(define-map key-data {key-id: uint} (tuple (business uint) (time uint)))

(define-public (issue-key (user principal))
    (let (
        (current-time stacks-block-height)
    )
        (begin
            (try! (nft-mint? keys (var-get nfts-minted) user))
            (var-set nfts-minted (+ (var-get nfts-minted) u1))
            (ok "Key issued successfully!")
        )
    ))

(define-read-only (get-key-details (key-id uint))
    (ok (nft-get-owner? keys key-id))   
)