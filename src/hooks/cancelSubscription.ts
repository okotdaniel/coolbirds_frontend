import { useState, useEffect, useActionState } from "react";
import { AppDispatch } from "@/lib/redux/store/stores";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks";
import { deleteSubscriptionRecord } from "@/lib/api/pricing/pricingApiSlice";

export function cancelSubscription(subscriptionId: string){

    const dispatch = useAppDispatch()

    const [ subscription, loading, error ] = useAppSelector( (state)=> state.subscription )

    useEffect( ()=>{
        dispatch(deleteSubscriptionRecord(subscriptionId))
    }, [dispatch])
    return { subscription }
    
}