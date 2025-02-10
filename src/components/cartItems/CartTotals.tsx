export function CartTotals({ subtotal, tax, total, layout }: { 
    subtotal: number; 
    tax: number; 
    total: number; 
    layout: 'page' | 'mini' 
  }) {
    return (
      <div className={layout === 'page' ? 'space-y-2' : 'space-y-4'}>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs.{subtotal.toFixed(2)}</span>
        </div>
        {layout === 'mini' && (
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Rs.{tax.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>Rs.{total.toFixed(2)}</span>
        </div>
      </div>
    );
  }